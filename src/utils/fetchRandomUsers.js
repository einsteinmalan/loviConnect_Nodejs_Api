// utils/fetchRandomUsers.js
const User = require("../models/user");
const Profile = require("../models/profile");
const { Op } = require("sequelize");

async function fetchRandomUsers(n, excludeIds) {
  const users = await User.findAll({
    where: {
      id: { [Op.notIn]: excludeIds },
      active: true,
      profile_completed: true,
    },
    limit: n,
    order: sequelize.random(),
    include: [{ model: Profile, as: "profile" }],
  });
  return users;
}

module.exports = fetchRandomUsers;
