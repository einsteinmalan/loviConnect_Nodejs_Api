// utils/checkProUser.js
const { Op } = require("sequelize");
const ProUser = require("../models/proUser");
const VersusWin = require("../models/versusWin");
const moment = require("moment");

async function checkProUser(userId) {
  const proUser = await ProUser.findOne({ where: { user_id: userId } });

  if (!proUser) {
    return 50;
  }

  const now = moment();
  const proUserEndDate = moment(proUser.date).add(
    {
      month: 1,
      semester: 6,
      year: 12,
    }[proUser.duration],
  );

  if (now.isAfter(proUserEndDate)) {
    return 50;
  }

  const versusWins = await VersusWin.count({ where: { chooser_id: userId } });
  const timeLeft = 24 - now.diff(proUser.date, "hours");

  return Math.min(300 - versusWins, timeLeft > 0 ? 300 : 50);
}

module.exports = checkProUser;
