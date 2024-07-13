// const connection = require("../config/database");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// const moment = require("moment");
// const fs = require("fs");
// const publicIp = require("public-ip");
// const emailSender = require("./emailSender");
// const ipLocation = require("iplocation");
// let form_validator = require("../form_validator");
// const uuid = require("uuid");

// export async function getUserInfoById(userid) {
//   try {
//     const result = await connection.query(
//       `
//         SELECT u.id,u.fullname,u.email,u.online, u.profile_completed, u.active, u.is_blocked, u.is_verified,u.creation_date, p.id_user,p.gender,p.sexuality, p.birthday,p.biography, p.my_contribution, p.my_expectation,p.location_lat, p.location_lon, p.zodiac_sign, p.job, p.relationship_status, p.looking_for, p.religion, p.avatar, p.fame, p.country_name, p.country_code
//         FROM users  u
//         LEFT JOIN profiles p ON profiles.id_user = users.id
//         WHERE users.id = ?
//         `,
//       userid,
//     );
//     if (result[0]) {
//       const user = {
//         id: result[0].id,
//         email: result[0].email,
//         fullname: result[0].fullname,
//         lon: result[0].location_lon,
//         lat: result[0].location_lat,
//         avatar: result[0].avatar,
//         online: result[0].online,
//         profile_completed: result[0].profile_completed,
//         active: result[0].active,
//         is_blocked: result[0].is_blocked,
//         is_verified: result[0].is_verified,
//         creation_date: result[0].creation_date,
//         gender: result[0].gender,
//         sexuality: result[0].sexuality,
//         birthday: result[0].birthday,
//         biography: result[0].biography,
//         my_contribution: result[0].my_contribution,
//         my_expectation: result[0].my_expectation,
//         zodiac_sign: result[0].zodiac_sign,
//         job: result[0].job,
//         relationship_status: result[0].relationship_status,
//         looking_for: result[0].looking_for,
//         religion: result[0].religion,
//         avatar: result[0].avatar,
//         fame: result[0].fame,
//         country_name: result[0].country_name,
//         country_code: result[0].country_code,
//       };
//       return user;
//     } else {
//       return { err: "This user does not exist" };
//     }
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function saveUserImage(user_id, type, path) {
//   const id = uuid.v4();
//   try {
//     await connection.query(
//       "INSERT INTO pics (id_pic,id_user, type, path) VALUES (?,?,?,?)",
//       [id, user_id, type, path],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return { id: id };
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function verifyExistEmail(email) {
//   try {
//     const result = await connection.query(
//       "SELECT email, id FROM users WHERE email = ?",
//       email.toLowerCase(),
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function verifyExistPhone(phone) {
//   try {
//     await connection.query(
//       "SELECT phone, id, is_verified FROM users WHERE phone = ? ",
//       [phone],
//       (error, result) => {
//         console.log(`error-> `, error);
//         console.log(`result-> `, result);
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //   return result;
//   } catch (err) {
//     console.log("CATCH-1", err);
//     throw new Error(err);
//   }
// }

// export async function updateUserOtp(otp, userId) {
//   try {
//     const result = await connection.query(
//       "UPDATE users SET otp = ? WHERE id = ? ",
//       [otp, userId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //   return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function verifyOtp(phone, otp) {
//   try {
//     await connection.query(
//       "SELECT * FROM users WHERE phone = ? AND otp = ?",
//       [phone, otp],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getUserSessions(refresh_token) {
//   try {
//     const result = await connection.query(
//       "SELECT * FROM sessions WHERE refresh_token = ?",
//       [refresh_token],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function createUserSession(user_id, refresh_token) {
//   const id = uuid.v4();
//   try {
//     await connection.query(
//       "INSERT INTO sessions (id,user_id, refresh_token) VALUES (?,?,?)",
//       [id, user_id, refresh_token],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function updateVerifyStatus(phone) {
//   try {
//     await connection.query(
//       "UPDATE users SET is_verified = 1 WHERE phone = ?",
//       [phone],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function updateOtp(phone, otp) {
//   try {
//     await connection.query(
//       "UPDATE users SET otp = ? WHERE phone = ?",
//       [otp, phone],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function authLogin(phone) {
//   try {
//     await connection.query(
//       "SELECT * FROM users WHERE phone = ? AND is_verified = 1",
//       [phone],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function verifyExistUsername(username) {
//   try {
//     await connection.query(
//       "SELECT username,id FROM users WHERE username = ?",
//       username.toLowerCase(),
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function checkUsername(username) {
//   try {
//     await connection.query(
//       "SELECT email,fullname FROM users WHERE username = ?",
//       username.toLowerCase(),
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function checkEmail(email) {
//   try {
//     await connection.query(
//       "SELECT email,fullname FROM users WHERE email = ?",
//       email.toLowerCase(),
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function updateResetpwdLink(username, resetpwd_link) {
//   try {
//     await connection.query(
//       "UPDATE users set ini_pwd_link = ? where username = ?",
//       [resetpwd_link, username],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function updatepwd(username, password) {
//   const hash = bcrypt.hashSync(password, 10);
//   try {
//     await connection.query("UPDATE users set password = ? where username = ?", [
//       hash,
//       username.toLowerCase(),
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     ]);
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function createUser(fullname, phone) {
//   const id = uuid.v4();
//   const data = [id, phone, fullname];
//   try {
//     await connection.query(
//       "INSERT INTO users (id, phone, fullname) VALUES (?, ?, ?) ",
//       data,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return { id: id };
//         }
//       },
//     );

//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function createNewUser(body) {
//   const password = body.password;
//   const fullname = body.fullname.toLowerCase();
//   const email = body.email;

//   if (!form_validator.isSafePass(password)) {
//     //it must be at least 8 characters long and contain at least one alphabet (uppercase or lowercase) and one digit
//     return { error: "The password is too weak.", data: [] };
//   }

//   const hash = bcrypt.hashSync(password, 10);
//   const active_link = crypto.randomBytes(10).toString("hex");
//   const id = uuid.v4();
//   const data = [id, email, fullname, hash, active_link];

//   console.log("Creating user");
//   await connection.query(
//     "INSERT INTO users (id, email, fullname, password, active_link) VALUES (?, ?, ?, ?, ?) ",
//     data,
//     (error, result) => {
//       if (error) {
//         return { error: error };
//       } else {
//         return result;
//       }
//     },
//   );
//   await emailSender.activeAccount(data.email, data.fullname, active_link);

//   return result;

//   // try {

//   // } catch (err) {
//   //   throw new Error(err);
//   // }
// }

// export async function createNewProfile(body, zodiac) {
//   const id = uuid.v4();
//   id_user = body.user_id;
//   const password = body.password;
//   const fullname = body.firstname.toLowerCase();
//   const birthday = body.dob;
//   const biography = body.biography;
//   const job = body.job;
//   const gender = body.gender;
//   const sexuality = body.sexuality;
//   const location_lat = body.lat;
//   const location_lon = body.lon;
//   const relationship_status = body.relationship_status;
//   const looking_for = body.looking_for;
//   const religion = body.religion;
//   const city = body.city;
//   const country_name = body.country_name;
//   const country_code = body.country_code;

//   if (body.user_id === null || body.user_id === undefined) {
//     return { error: "No user_id provided", data: [] };
//   }

//   // if (!form_validator.isSafePass(password)) {
//   //   return { error: "The password is too weak.", data: [] };
//   // }

//   // if (!form_validator.isName(fullname)) {
//   //   return { error: "The fullname is not a valid name", data: [] };
//   // }

//   if (!form_validator.isDateofBirth(birthday)) {
//     return { error: "The birthdate is not valid", data: [] };
//   }

//   try {
//     // const IP = await publicIp.v4();
//     // const LatLng = await ipLocation(IP);
//     // console.log("LatLn", LatLng);
//     const dataProfile = {
//       id: id,
//       id_user: id_user,
//       location_lat: location_lat,
//       location_lon: location_lon,
//       city: city,
//       country_name: country_name,
//       country_code: country_code,
//       gender: gender,
//       gender: gender,
//       sexuality: sexuality,
//       birthday: birthday,
//       biography: biography,
//       job: job,
//       relationship_status: relationship_status,
//       looking_for: looking_for,
//       religion: religion,
//       country_name: country_name,
//       country_code: country_code,
//       zodiac_sign: zodiac,
//     };
//     await connection.query(
//       "INSERT INTO profiles SET ?",
//       dataProfile,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return { error: null, data: [] };
//   } catch (err) {
//     // throw new Error(err);
//     return { error: err };
//   }
// }

// export async function verifyLink(active_link) {
//   try {
//     await connection.query(
//       "UPDATE users set active = 1, active_link = NULL where active_link = ?",
//       active_link,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result.affectedRows;
//   } catch (err) {
//     //throw new Error(err);
//     return { error: err };
//   }
// }

// export async function verifyPwdLink(resetpwd_link) {
//   try {
//     await connection.query(
//       "SELECT fullname FROM users where ini_pwd_link = ?",
//       resetpwd_link,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result[0].username;
//         }
//       },
//     );
//     // if (result[0]) {
//     //   return result[0].username;
//     // }
//   } catch (err) {
//     //throw new Error(err);
//     return { error: err };
//   }
// }

// export async function login(data) {
//   try {
//     const check = await connection.query(
//       `SELECT users.*, admins.id AS admin_id,admins.user_id, admins.type AS admin_type
//       FROM users
//       LEFT JOIN admins on  admins.user_id = users.id
//       WHERE users.email = ?
//       `,
//       [data.email.toLowerCase()],
//     );
//     console.log("login", check[0]);
//     if (!check[0])
//       return { err: "User does not exit, please create an account first" };
//     else if (!check[0].active)
//       return { err: "Your account has not been actived, check your email" };
//     else if (!bcrypt.compareSync(data.password, check[0].password))
//       return { err: "password unmatched, try again" };
//     else {
//       const last_login = moment().format("Y-M-D H:m:s");
//       try {
//         await connection.query(
//           "UPDATE users set online = 1, last_login = ? where email = ?",
//           [last_login, data.email.toLowerCase()],
//         );
//         const user = {
//           userid: check[0].id,
//           fullname: check[0].fullname,
//           admin_id: check[0].admin_id,
//           admin_type: check[0].admin_type,
//         };
//         return user;
//       } catch (err) {
//         //throw new Error(err);
//         return { error: err };
//       }
//     }
//   } catch (err) {
//     //throw new Error(err);
//     return { error: err };
//   }
// }

// export async function logout(userid) {
//   try {
//     await connection.query(
//       "UPDATE users set online = 0 where id_user = ?",
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     // throw new Error(err);
//     return { error: err };
//   }
// }

// export async function getUserSettings(userid) {
//   try {
//     await connection.query(
//       "SELECT * FROM user_filters WHERE user_id = ?",
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getProfileInfoById(userid) {
//   try {
//     await connection.query(
//       `SELECT profiles.id_user, profiles.id, profiles.gender, profiles.birthday, profiles.biography, profiles.location_lat, profiles.location_lon, u.avatar, profiles.fame, profiles.city, u.fullname, u.online, profiles.country, profiles.country_code, profiles.city, profiles.zodiac_sign, u.active, u.is_blocked, u.creation_date
//             FROM profiles
//             LEFT JOIN users AS u on profiles.id_user = users.id
//             WHERE profiles.id_user = ?`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // if (!result[0]) {
//     //   return { err: "User does not exist" };
//     // } else {
//     //   return result[0];
//     // }
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getCreateProfile(userid) {
//   try {
//     await connection.query(
//       `SELECT * FROM users WHERE id = ?`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result[0];
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getInterestsById(userid) {
//   try {
//     await connection.query(
//       `
//             SELECT interest FROM interests
//             LEFT JOIN users_interests on interests.id = users_interests.id_interest
//             WHERE users_interests.id_user = ?`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getPictureById(userid) {
//   try {
//     await connection.query(
//       `
//             SELECT path FROM pics
//             WHERE id_user = ?`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addFame(fame, userid) {
//   try {
//     await connection.query(
//       "SET @i = ?; UPDATE profiles SET fame = fame + @i WHERE id_user = ?",
//       [fame, userid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addNotif(data) {
//   try {
//     await connection.query(
//       "INSERT INTO notifications SET ?",
//       data,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getNotif(userid) {
//   try {
//     await connection.query(
//       `
//         SELECT id_notif, id_sender, users.fullname, users.online, profiles.avatar, notification, notif_time, read, type
//         FROM notifications
//         LEFT JOIN users on notifications.id_sender = users.id
//         LEFT JOIN profiles on notifications.id_sender = profiles.id_user
//         WHERE notifications.id_user = ?
//         ORDER BY notif_time DESC`,
//       [userid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }
// export async function setAllReaded(userid) {
//   try {
//     await connection.query(
//       "UPDATE notifications SET read = 1 WHERE id_user = ?",
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function readNotif(id_notif) {
//   try {
//     await connection.query(
//       "UPDATE notifications SET read = 1 WHERE id_notif = ?",
//       id_notif,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function modifyAccount(data, userid) {
//   const email = await verifyExistEmail(data.email, userid);
//   if (typeof email !== "undefined") {
//     return { err: "This email has been used by another user" };
//   }
//   // const username = await verifyExistUsername(data.username, userid);
//   // if(typeof(username) !== 'undefined'){
//   //     return { err: 'Username has been taken.' };
//   // }
//   try {
//     await connection.query(
//       "UPDATE users SET ? WHERE id_user = ?",
//       [data, userid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function modify_profile(data) {
//   try {
//     const profile = await connection.query(
//       "SELECT id_user FROM profiles WHERE id_user = ?",
//       [data.id_user],
//     );
//     if (!profile[0]) {
//       try {
//         await connection.query("INSERT INTO profiles set ?", [data]);
//       } catch (err) {
//         throw new Error(err);
//       }
//     } else {
//       try {
//         await connection.query(
//           "UPDATE profiles set ? WHERE id_user = ?",
//           [data, data.id_user],
//           (error, result) => {
//             if (error) {
//               return { error: error };
//             } else {
//               return result;
//             }
//           },
//         );
//       } catch (err) {
//         throw new Error(err);
//       }
//     }
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function modify_location(data) {
//   try {
//     let lat = data.data.location_lat;
//     let lon = data.data.location_lon;
//     let city = data.data.city;
//     let country_name = data.data.country_name;
//     let country_code = data.data.country_code;

//     await connection.query(
//       "UPDATE profiles set location_lat = ?, location_lon = ?, city = ?,country_name = ?, country_code = ?   WHERE id_user = ?",
//       [lat, lon, city, country_name, country_code, data.id_user],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function modifyInterests(data) {
//   try {
//     await connection.query(
//       "DELETE FROM users_interests WHERE id_user = ?",
//       data.id_user,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
//   data.interest.map(async (interest) => {
//     try {
//       const id_interest = await connection.query(
//         "SELECT id FROM interests WHERE interest = ?",
//         interest.interest,
//       );
//       try {
//         await connection.query(
//           " INSERT INTO users_interests (id_user, id_interest) VALUES (?,?)",
//           [data.id_user, id_interest[0].id],
//           (error, result) => {
//             if (error) {
//               return { error: error };
//             } else {
//               return result;
//             }
//           },
//         );
//       } catch (err) {
//         throw new Error(err);
//       }
//     } catch (err) {
//       throw new Error(err);
//     }
//   });
// }

// export async function checkLike(userid, likerid) {
//   try {
//     await connection.query(
//       "SELECT * FROM likes WHERE id_user = ? AND id_sender = ?",
//       [userid, likerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addLike(userid, likerid) {
//   try {
//     await connection.query(
//       "INSERT INTO likes (id_user, id_sender) VALUES (?, ?)",
//       [userid, likerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addWins(id, userId, chooserId, lostId) {
//   try {
//     await connection.query(
//       "INSERT INTO versus_wins (id,chooser_id, user_id, lost_id) VALUES (?, ?, ?, ?)",
//       [id, chooserId, userId, lostId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addLost(id, userId, chooserId, lostId) {
//   try {
//     await connection.query(
//       "INSERT INTO versus_losts (id,chooser_id, user_id, win_id) VALUES (?, ?, ?, ?)",
//       [id, chooserId, userId, lostId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function checkBlock(userid, blockerid) {
//   try {
//     await connection.query(
//       "SELECT * FROM blocks WHERE id_user = ? AND id_sender = ?",
//       [userid, blockerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function checkFake(userid, senderid) {
//   try {
//     await connection.query(
//       "SELECT * FROM fakes WHERE id_user = ? AND id_sender = ?",
//       [userid, senderid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addBlock(userid, blockerid) {
//   try {
//     await connection.query(
//       "INSERT INTO blocks (id_user, id_sender) VALUES (?, ?)",
//       [userid, blockerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function countFake(userid) {
//   try {
//     await connection.query(
//       "SELECT COUNT(id_user) AS count FROM Fakes WHERE id_user = ?",
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result[0].count;
//         }
//       },
//     );
//     //return result[0].count;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function addFake(id_fakeuserid, senderid) {
//   try {
//     await connection.query(
//       "INSERT INTO fakes (id_fake, id_fake,id_user, id_sender) VALUES (?, ?,?)",
//       [id_fake, userid, senderid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function unlike(userid, unlikerid) {
//   try {
//     await connection.query(
//       "DELETE FROM likes WHERE id_user = ? AND id_sender = ?;",
//       [userid, unlikerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getInterestsList() {
//   try {
//     await connection.query("SELECT * FROM interests;", (error, result) => {
//       if (error) {
//         return { error: error };
//       } else {
//         return result;
//       }
//     });
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function uploadAvatar(userid, filename) {
//   const profile = await connection.query(
//     "SELECT id_user, avatar FROM profiles WHERE id_user = ?",
//     userid,
//   );
//   if (!profile[0]) {
//     try {
//       await connection.query(
//         "INSERT INTO profiles ( avatar, id_user) VALUES (?, ?)",
//         [filename, userid],
//         (error, result) => {
//           if (error) {
//             return { error: error };
//           } else {
//             return result;
//           }
//         },
//       );
//     } catch (err) {
//       throw new Error(err);
//     }
//   } else {
//     if (profile[0].avatar) {
//       let filename = profile[0].avatar.split("/");
//       fs.unlink(`../user_images/${filename[filename.length - 1]}`, (err) => {
//         if (err) console.log(err);
//       });
//     }
//     try {
//       await connection.query(
//         "UPDATE profiles SET avatar = ? WHERE id_user = ?",
//         [filename, userid],
//         (error, result) => {
//           if (error) {
//             return { error: error };
//           } else {
//             return result;
//           }
//         },
//       );
//     } catch (err) {
//       throw new Error(err);
//     }
//   }
// }

// export async function hibernateAccount(isBlocked, userId) {
//   try {
//     await connection.query(
//       "UPDATE users SET is_blocked = ? WHERE id = ?",
//       [isBlocked, userId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function uploadPics(userid, filename) {
//   try {
//     await connection.query(
//       "INSERT INTO pics ( id_user, path ) VALUES (?, ?)",
//       [userid, filename],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function deletePics(path) {
//   let filename = path.split("/");
//   fs.unlink(`../user_images/${filename[filename.length - 1]}`, (err) => {
//     if (err) console.log(err);
//   });
//   try {
//     await connection.query(
//       "DELETE FROM pics WHERE path = ?",
//       path,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getBlockList(userid) {
//   try {
//     await connection.query(
//       `
//             SELECT blocks.id_user, users.firstname, users.lastname,  users.username, users.online, profiles.avatar
//             FROM blocks
//             LEFT JOIN users on blocks.id_user = users.id_user
//             LEFT JOIN profiles on blocks.id_user = profiles.id_user
//             WHERE blocks.id_sender = ?
//             ORDER BY block_time DESC`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function unBlockUser(userid, blockerid) {
//   try {
//     await connection.query(
//       "DELETE FROM blocks WHERE id_user = ? and id_sender = ?",
//       [userid, blockerid],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getVisitList(userid) {
//   try {
//     await connection.query(
//       `
//             SELECT notifications.id_user, notification, notif_time,  users.online, users.username, users.firstname, users.lastname, profiles.avatar
//             FROM notifications
//             LEFT JOIN users on notifications.id_user = users.id_user
//             LEFT JOIN profiles on notifications.id_user = profiles.id_user
//             WHERE notifications.id_sender = ? AND notifications.notification = 'visits'
//             ORDER BY notif_time DESC`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getLikeList(userid) {
//   try {
//     await connection.query(
//       `
//             SELECT notifications.id_user, notification, notif_time,  users.online, users.username, users.firstname, users.lastname, profiles.avatar
//             FROM notifications
//             LEFT JOIN users on notifications.id_user = users.id_user
//             LEFT JOIN profiles on notifications.id_user = profiles.id_user
//             WHERE notifications.id_sender = ? AND notifications.notification = 'likes'
//             ORDER BY notif_time DESC`,
//       userid,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     // return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function deleteUser(userid) {
//   try {
//     //DELETE FROM users WHERE id_user = '${userid}';
//     //DELETE FROM profiles WHERE id_user = '${userid}';

//     await connection.query(
//       `
//             DELETE FROM blocks WHERE id_user = '${userid}' OR id_sender = '${userid}';
//             DELETE FROM chatrooms WHERE id_user_1 = '${userid}' OR id_user_2 = '${userid}';
//             DELETE FROM fakes WHERE id_user = '${userid}' OR id_sender = '${userid}';
//             DELETE FROM likes WHERE id_user = '${userid}' OR id_sender = '${userid}';
//             DELETE FROM messages WHERE id_user = '${userid}' OR id_sender = '${userid}';
//             DELETE FROM notifications WHERE id_user = '${userid}' OR id_sender = '${userid}';
//             DELETE FROM pics WHERE id_user = '${userid}';
//             DELETE FROM users_interests WHERE id_user = '${userid}';
//             DELETE FROM versus_wins WHERE win_id = '${userid}';
//             DELETE FROM versus_wins WHERE lost_id = '${userid}';
//              DELETE FROM versus_wins WHERE chooser_id = '${userid}';
//         `,
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zodiac_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ini_pwd_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    refreshtokenid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  },
);

module.exports = User;
