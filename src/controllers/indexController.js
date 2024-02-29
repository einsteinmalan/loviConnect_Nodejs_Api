const userModel = require("../models/user");
const indexModel = require("../models/index");
const geolib = require("geolib");
const moment = require("moment");

export async function getSuggestions(req, res) {
  const totalSwipe = 0;
  const isPro = await checkIsUserPro(req.userid);

  if (isPro) totalSwipe = 300;
  if (!isPro) totalSwipe = 50;

  const { allowed, versusWInCOunt } = await countVersusWinsForUser(
    req.userid,
    totalSwipe,
  );

  if (allowed) {
    const profile = await userModel.getProfileInfoById(req.userid);
    const userSettings = await userModel.getUserSettings(req.userid);
    const range = geolib.getBoundsOfDistance(
      { latitude: profile.location_lat, longitude: profile.location_lon },
      50000,
    );
    let suggestions = [];
    switch (userSettings[0].gender) {
      case "male":
        suggestions = await indexModel.getSuggestions(
          "male",
          userSettings[0].sexuality,
          range[0].latitude,
          range[1].latitude,
          range[0].longitude,
          range[1].longitude,
          req.userid,
        );
        break;
      case "female":
        suggestions = await indexModel.getSuggestions(
          "female",
          userSettings[0].sexuality,
          range[0].latitude,
          range[1].latitude,
          range[0].longitude,
          range[1].longitude,
          req.userid,
        );
        break;
      case "both":
        suggestions = await indexModel.getSuggestions(
          "both",
          userSettings[0].sexuality,
          range[0].latitude,
          range[1].latitude,
          range[0].longitude,
          range[1].longitude,
          req.userid,
        );
        //   suggestions = await indexModel.getSuggestionsIfBi(
        //     range[0].latitude,
        //     range[1].latitude,
        //     range[0].longitude,
        //     range[1].longitude,
        //     req.userid,
        //   );
        break;
    }
    return res.status(200).json({
      statusCode: 200,
      message: `List of ${totalSwipe} potential match fetched`,
      error: null,
      data: suggestions,
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: `An error occured`,
      error: `An error occured`,
      data: [],
    });
  }
}
// getBoundsOfDistance return:
// [0]southwestern：min{latitude: -0.04491576420597608, longitude: -0.04491576420597608},
// [1]northeastern: max{latitude: 0.04491576420597608, longitude: 0.04491576420597608}

export async function checkIsUserPro(userID) {
  const [proUser] = await indexModel.getIsUserPro(userID);
  return proUser && proUser.length > 0;
}

export async function countVersusWinsForUser(userId, totalAllowed) {
  const currentDate = new Date();
  const startOfToday = new Date(currentDate);
  startOfToday.setHours(0, 0, 0, 0);

  // Query to count the number of versus_wins for the user within the last 24 hours

  const [result] = await indexModel.countVersusWins(userId);
  const versusWinCount = result[0].count;

  return {
    allowed: versusWinCount < totalAllowed,
    versusWinCount,
  };
}

export async function searchUser(req, res) {
  const result = await indexModel.searchUser(
    req.userid,
    req.params.searchUserInput,
  );
  return res.status(200).json({
    data: result,
  });
}

const ageToBirthYear = (age) => {
  const year = moment().format("YYYY");
  const birthYear = moment()
    .set("year", year - age)
    .format("YYYY");
  return birthYear;
};
const sortInterests = (users, tags) => {
  var sortedUsers = [];
  for (var i = 0; i < users.length; i++) {
    var count = 0;
    for (var k = 0; k < users[i].interests.length; k++) {
      for (var j = 0; j < tags.length; j++) {
        if (tags[j].interest == users[i].interests[k].interest) {
          count++;
        }
      }
    }
    if (count == tags.length) sortedUsers.push(users[i]);
  }
  return sortedUsers;
};

export async function filterUser(req, res) {
  const profile = await userModel.getProfileInfoById(req.userid);
  let range = geolib.getBoundsOfDistance(
    { latitude: profile.location_lat, longitude: profile.location_lon },
    req.body.distance * 1000,
  );
  let fameMin = req.body.fame[0];
  let fameMax = req.body.fame[1];
  if (fameMax === 1000) {
    fameMax = 2147483647;
  }
  let ageMin = ageToBirthYear(req.body.age[1]);
  let ageMax = ageToBirthYear(req.body.age[0]);
  let gender = req.body.gender;
  if (!gender) {
    switch (profile.gender) {
      case "male":
        gender = "female";
        break;
      case "female":
        gender = "male";
        break;
    }
  }
  let sexPrefer = req.body.sexPrefer;
  if (!sexPrefer) {
    sexPrefer = profile.sex_prefer;
  }
  let tags = req.body.selectedInterests;
  let users = await indexModel.filterUser(
    ageMin,
    ageMax,
    fameMin,
    fameMax,
    gender,
    sexPrefer,
    range[0].latitude,
    range[1].latitude,
    range[0].longitude,
    range[1].longitude,
    req.userid,
  );
  for (var i = 0; i < users.length; i++) {
    const interests = await userModel.getInterestsById(users[i].id_user);
    users[i].interests = interests;
  }
  let result;
  result = users;
  if (tags.length && users.length) {
    result = sortInterests(users, tags);
  }
  return res.status(200).json({
    data: result,
  });
}
