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
          userSettings[0].age_start,
          userSettings[0].age_limit,
          userSettings[0].interest,
          profile.zodiac_sign,
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
          userSettings[0].age_start,
          userSettings[0].age_limit,
          userSettings[0].interest,
          profile.zodiac_sign,
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
          userSettings[0].age_start,
          userSettings[0].age_limit,
          userSettings[0].interest,
          profile.zodiac_sign,
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

    const data = suggestions[0];
    return res.status(200).json({
      statusCode: 200,
      message: `List of ${totalSwipe} potential match fetched`,
      error: null,
      data: data,
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: `You have exhausted your quota for today. Please consider going Pro if you wish to continue`,
      error: `You have exhausted your quota for today. Please consider going Pro if you wish to continue`,
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

export async function getUserFilters(userId) {
  const result = indexModel.getUserFilters(userId);
  return result[0];
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

export async function calculateZodiacCompatibility(sign1, sign2) {
  // Your zodiac compatibility logic goes here
  // You can create a mapping or a set of rules to determine compatibility based on zodiac signs
  // For simplicity, let's assume there's a predefined compatibility map
  const compatibilityMap = {
    Aries: {
      Aries: 80,
      Taurus: 50,
      Gemini: 60,
      Cancer: 30,
      Leo: 70,
      Virgo: 40,
      Libra: 60,
      Scorpio: 30,
      Sagittarius: 70,
      Capricorn: 40,
      Aquarius: 60,
      Pisces: 50,
    },
    Taurus: {
      Aries: 50,
      Taurus: 70,
      Gemini: 40,
      Cancer: 60,
      Leo: 30,
      Virgo: 70,
      Libra: 50,
      Scorpio: 60,
      Sagittarius: 30,
      Capricorn: 70,
      Aquarius: 50,
      Pisces: 40,
    },
    Gemini: {
      Aries: 60,
      Taurus: 40,
      Gemini: 70,
      Cancer: 50,
      Leo: 60,
      Virgo: 30,
      Libra: 70,
      Scorpio: 40,
      Sagittarius: 60,
      Capricorn: 30,
      Aquarius: 50,
      Pisces: 70,
    },
    Cancer: {
      Aries: 30,
      Taurus: 60,
      Gemini: 50,
      Cancer: 70,
      Leo: 40,
      Virgo: 60,
      Libra: 30,
      Scorpio: 70,
      Sagittarius: 40,
      Capricorn: 60,
      Aquarius: 70,
      Pisces: 50,
    },
    Leo: {
      Aries: 70,
      Taurus: 30,
      Gemini: 60,
      Cancer: 40,
      Leo: 70,
      Virgo: 50,
      Libra: 60,
      Scorpio: 30,
      Sagittarius: 70,
      Capricorn: 40,
      Aquarius: 50,
      Pisces: 60,
    },
    Virgo: {
      Aries: 40,
      Taurus: 70,
      Gemini: 30,
      Cancer: 60,
      Leo: 50,
      Virgo: 70,
      Libra: 40,
      Scorpio: 60,
      Sagittarius: 50,
      Capricorn: 70,
      Aquarius: 60,
      Pisces: 30,
    },
    Libra: {
      Aries: 60,
      Taurus: 50,
      Gemini: 70,
      Cancer: 30,
      Leo: 60,
      Virgo: 40,
      Libra: 70,
      Scorpio: 50,
      Sagittarius: 60,
      Capricorn: 40,
      Aquarius: 70,
      Pisces: 50,
    },
    Scorpio: {
      Aries: 30,
      Taurus: 60,
      Gemini: 40,
      Cancer: 70,
      Leo: 30,
      Virgo: 60,
      Libra: 50,
      Scorpio: 70,
      Sagittarius: 30,
      Capricorn: 60,
      Aquarius: 50,
      Pisces: 60,
    },
    Sagittarius: {
      Aries: 70,
      Taurus: 30,
      Gemini: 60,
      Cancer: 40,
      Leo: 70,
      Virgo: 50,
      Libra: 60,
      Scorpio: 30,
      Sagittarius: 70,
      Capricorn: 40,
      Aquarius: 50,
      Pisces: 60,
    },
    Capricorn: {
      Aries: 40,
      Taurus: 70,
      Gemini: 30,
      Cancer: 60,
      Leo: 40,
      Virgo: 70,
      Libra: 40,
      Scorpio: 60,
      Sagittarius: 40,
      Capricorn: 70,
      Aquarius: 30,
      Pisces: 60,
    },
    Aquarius: {
      Aries: 60,
      Taurus: 50,
      Gemini: 50,
      Cancer: 70,
      Leo: 50,
      Virgo: 60,
      Libra: 70,
      Scorpio: 50,
      Sagittarius: 50,
      Capricorn: 30,
      Aquarius: 70,
      Pisces: 50,
    },
    Pisces: {
      Aries: 30,
      Taurus: 30,
      Gemini: 80,
      Cancer: 30,
      Leo: 60,
      Virgo: 40,
      Libra: 40,
      Scorpio: 80,
      Sagittarius: 40,
      Capricorn: 60,
      Aquarius: 80,
      Pisces: 70,
    },
  };

  return compatibilityMap[sign1][sign2] || 0;
}

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
  let sexPrefer = req.body.sexuality;
  if (!sexPrefer) {
    sexPrefer = profile.sexuality;
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
