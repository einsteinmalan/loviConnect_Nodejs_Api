// utils/applyFilters.js
const { Op } = require("sequelize");
const Block = require("../models/block");
const SysBlock = require("../models/sysBlock");
const UserFilter = require("../models/userFilter");
const Booster = require("../models/booster");
const VersusWin = require("../models/versusWin");
const Profile = require("../models/profile");

async function applyFilters(user, users) {
  const blockedUsers = await Block.findAll({
    where: { [Op.or]: [{ id_sender: user.id }, { id_user: user.id }] },
  });
  const blockedUserIds = blockedUsers
    .map((b) => b.id_user)
    .concat(blockedUsers.map((b) => b.id_sender));

  const sysBlockedUsers = await SysBlock.findAll();
  const sysBlockedUserIds = sysBlockedUsers.map((b) => b.id_user);

  const versusWins = await VersusWin.findAll({
    where: { chooser_id: user.id },
  });
  const versusWinIds = versusWins
    .map((v) => v.win_id)
    .concat(versusWins.map((v) => v.lost_id));

  const userFilters = await UserFilter.findOne({ where: { user_id: user.id } });

  const boosters = await Booster.findAll();
  const userBooster = boosters.find((b) => b.user_id === user.id);

  return users.filter((u) => {
    const isBlocked = blockedUserIds.includes(u.id);
    const isSysBlocked = sysBlockedUserIds.includes(u.id);
    const isVersusWin = versusWinIds.includes(u.id);
    const isActive = u.active && u.profile_completed;

    const matchesGender =
      userFilters.gender === "both" || u.gender === userFilters.gender;
    const matchesSexuality =
      !userFilters.sexuality || u.sexuality === userFilters.sexuality;
    const matchesAge =
      moment().diff(u.birthday, "years") >= userFilters.age_start &&
      moment().diff(u.birthday, "years") <= userFilters.age_limit;
    const matchesLocation =
      !userFilters.location || u.city === userFilters.location;

    let matchesBooster = true;
    if (userBooster && userBooster.type === "super_boost") {
      if (u.country_code !== user.country_code) {
        matchesBooster = boosters.some(
          (b) => b.user_id === u.id && b.type === "super_boost",
        );
      }
    }

    return (
      !isBlocked &&
      !isSysBlocked &&
      !isVersusWin &&
      isActive &&
      matchesGender &&
      matchesSexuality &&
      matchesAge &&
      matchesLocation &&
      matchesBooster
    );
  });
}

module.exports = applyFilters;
