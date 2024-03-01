const connection = require("../config/database");
const moment = require('moment'); /

async function user_interest(userid) {
  try {
    const result = await connection.query(
      `
            SELECT id_interest FROM users_interests WHERE id_user = ?
        `,
      [userid],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

function InterestArray(userinterest) {
  let userIntArr = [];
  for (let entry of userinterest) {
    userIntArr.push(entry.id_interest);
  }
  return userIntArr;
}

async function getInterestNb(suggId, userIntArr) {
  try {
    const result = await connection.query(
      `
            SELECT (id) 
                FROM users_interests 
                WHERE id_user = ? 
                AND id_interest IN (?)
        `,
      [suggId, userIntArr],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

async function getInterestNum(userinterest, result) {
  let userIntArr = InterestArray(userinterest);
  let numCommonInterest = {};
  for (let j = 0; j < result.length; j++) {
    let suggId = result[j].id_user;
    const lengthInterest = await getInterestNb(suggId, userIntArr);
    numCommonInterest[j] = lengthInterest.length;
  }
  return numCommonInterest;
}


export async function getIsUserPro(userId) {
  try {
    const result = await connection.query(
      `
      SELECT * FROM pro_users 
      WHERE user_id = ? 
      ORDER BY date DESC LIMIT 1
        `,
      [userId],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function countVersusWins(userId) {
  try {
    const result = await connection.query(
      `
      SELECT COUNT(*) as count
      FROM versus_wins
      WHERE chooser_id = ? AND TIMEDIFF(NOW(), date) <= '24:00:00';
     `,
      [userId],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUserFilters(userId) {
  try {
    const result = await connection.query(
      `
       SELECT * FROM user_filters 
       WHERE user_id = ?;
      `,
      [userId],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSuggestions(
  gender,
  sexPrefer,
  minLat,
  maxLat,
  minLong,
  MaxLong,
  userid,
) {
  try {
      const numbProfiles ;
     const {hasExpired} = await hasProExpired(userid);
     if(hasExpired){
        numbProfiles = 100;
     }else{
        numbProfiles =  500;
     }

    const result = await connection.query(
      `
            SELECT u.id, u.fullname, u.online, u.zodiac_sign, u.is_blocked, u.active, u.profile_completed
                p.gender, p.birthday, p.sexuality, p.avatar, p.biography,
                p.location_lat, p.location_lon, p.fame, p.city, p.country, p.country_code 
                FROM users AS u
                LEFT JOIN profiles AS p on u.id = p.id_user
                WHERE p.gender = ?
                AND u.is_blocked = 0
                ANd u.active = 1
                AND u.profile_completed = 1
                AND p.sexuality = ?
                AND (p.location_lat BETWEEN ? AND ?)
                AND (p.location_lon BETWEEN ? AND ?)
                AND u.id NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND u.id NOT IN (SELECT versus_wins.win_id FROM versus_wins WHERE chooser_id = ?)
                AND u.id NOT IN (SELECT versus_wins.lost_id FROM versus_wins WHERE chooser_id = ?)
                AND u.id != ?
                ORDER BY RAND() LIMIT ?
                -- ORDER BY p.fame DESC
        `,
      [
        gender,
        sexPrefer,
        minLat,
        maxLat,
        minLong,
        MaxLong,
        userid,
        userid,
        userid,
        userid,
        numbProfiles
      ],
    );
    const userinterest = await user_interest(userid);
    const resultOfgetIntNum = await getInterestNum(userinterest, result);
    for (let k = 0; k < result.length; k++) {
      result[k]["CommonInterestNb"] = resultOfgetIntNum[k];
    }
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSuggestionsIfBi(
  minLat,
  maxLat,
  minLong,
  MaxLong,
  userid,
) {
  try {
    const numbProfiles ;
     const {hasProExpired} = await hasProExpired(userid);
     if(hasProExpired){
        numbProfiles = 100;
     }else{
        numbProfiles =  500;
     }

    const result = await connection.query(
      `
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography,
                location_lat, location_lon, fame, city
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE sexuality = ?
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,
      ["bi", minLat, maxLat, minLong, MaxLong, userid, userid],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

export async function searchUser(userid, keyword) {
  try {
    const result = await connection.query(
      `
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography, 
                location_lat, location_lon, fame, city
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE (
                    username LIKE '%${keyword}%'
                    OR firstname LIKE '%${keyword}%'
                    OR lastname LIKE '%${keyword}%'
                    OR biography LIKE '%${keyword}%'
                )
                AND users.id_user != ?
                ORDER BY fame DESC`,
      [userid],
    );
    const userinterest = await user_interest(userid);
    const resultOfgetIntNum = await getInterestNum(userinterest, result);
    for (let k = 0; k < result.length; k++) {
      result[k]["CommonInterestNb"] = resultOfgetIntNum[k];
    }
    return result;
  } catch (err) {
    throw new Error(err);
  }
}

//find out if user is pro
// Function to calculate the expiration date based on the subscription package
export async function calculateExpirationDate(startDate, packageType) {
  const durationMapping = {
    month: 1,
    semester: 6,
    year: 12,
  };

  return moment(startDate).add(durationMapping[packageType], "months");
}

export async function hasProExpired(userId) {
  // Query to get the user's subscription details
  const query =
    "SELECT * FROM pro_users WHERE user_id = ? ORDER BY date DESC LIMIT 1";
  const [subscription] = await connection.query(query, [userId]);

  if (!subscription || !subscription.length) {
    const hasExpired = true;
    return {
        hasExpired
    }
   // throw new Error("User not found or no subscription details available.");
  }

  const { duration, date } = subscription[0];
  const currentDate = moment();

  // Determine the expiration date based on the subscription package
  const expirationDate = calculateExpirationDate(date, duration);

  // Check if the subscription has expired
  const hasExpired = currentDate.isAfter(expirationDate);

  return {
    duration,
    expirationDate: expirationDate.format("YYYY-MM-DD HH:mm:ss"),
    hasExpired,
  };
}

export async function filterUser(
  ageMin,
  ageMax,
  fameMin,
  fameMax,
  gender,
  sexPrefer,
  minLat,
  maxLat,
  minLong,
  MaxLong,
  userid,
) {
  try {
    const result = await connection.query(
      `
            SELECT users.id_user, username, firstname, lastname, online,
                gender, birthday, sex_prefer, avatar, biography, 
                location_lat, location_lon, fame, city
                FROM users
                LEFT JOIN profiles on users.id_user = profiles.id_user
                WHERE gender = ?
                AND sex_prefer = ?
                AND ((SELECT YEAR(birthday)) BETWEEN ? AND ?)
                AND (location_lat BETWEEN ? AND ?)
                AND (location_lon BETWEEN ? AND ?)
                AND users.id_user NOT IN (SELECT blocks.id_user FROM blocks WHERE id_sender = ?)
                AND users.id_user != ?
                ORDER BY fame DESC
        `,
      [
        gender,
        sexPrefer,
        ageMin,
        ageMax,
        minLat,
        maxLat,
        minLong,
        MaxLong,
        userid,
        userid,
      ],
    );
    const userinterest = await user_interest(userid);
    const resultOfgetIntNum = await getInterestNum(userinterest, result);
    for (let k = 0; k < result.length; k++) {
      result[k]["CommonInterestNb"] = resultOfgetIntNum[k];
    }
    return result;
  } catch (err) {
    throw new Error(err);
  }
}
