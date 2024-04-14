const userModel = require("../models/user");
const chatModel = require("../models/chat");
const jwtModel = require("../models/jwt");
const emailSender = require("../models/emailSender");
const crypto = require("crypto");
let form_validator = require("../form_validator");

// Upload and store images
const multer = require("multer");

const storage = multer.diskStorage({
  // Place of picture
  destination: (request, file, callback) => {
    callback(null, "user_images/");
  },
  filename: (request, file, callback) => {
    const avatarName = Date.now() + file.originalname;
    callback(null, avatarName);
  },
});

const uploadImage = multer({
  storage: storage,
});

export async function getAccount(req, res) {
  const result = await userModel.getUserInfoById(req.params.userId);
  if (typeof result.err !== "undefined") {
    return res.status(400).json({
      error: result.err,
      status: 400,
      data: [],
      message: "Account doesn't exist!",
    });
  } else {
    return res.status(200).json({
      data: result,
      status: 200,
      error: null,
      message: "Account retrieved successfully!!!",
    });
  }
}

export async function register(req, res) {
  const email = req.body.email;
  if (form_validator.isEmail(email)) {
    const check_email = await userModel.verifyExistEmail(email);
    if (check_email[0]) {
      return res.status(400).json({
        error: "Email exist already!",
        status: 400,
        message: "",
        data: [],
      });
    } else {
      const result = await userModel.createNewUser(req.body);
      console.log("result", result);
      if (result?.error) {
        return res.status(400).json({
          status: 400,
          error: result.error,
          data: [],
          message: "",
        });
      } else {
        return res.status(200).json({
          status: 200,
          error: null,
          data: [],
          message:
            "Registration Successfully. A email has been sent to your email, please activate your account before login",
        });
      }
    }
  } else {
    return res.status(400).json({
      error: "Email is not valid",
      status: 400,
      message: "",
      data: [],
    });
  }
}

export async function createUserProfile(req, res) {
  const dob = req.body.dob; //Mysql date format
  const zodiac = await getZodiacSign(dob);
  const result = await userModel.createNewProfile(req.body, zodiac);
  if (!result) {
    return res.status(400).json({
      error: "An error occured! COuldn't create user profile",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  return res.status(200).json({
    error: null,
    status: 200,
    message: "User profile successfully created",
    data: [],
  });
}

export async function active(req, res) {
  const verifyLink = await userModel.verifyLink(req.params.active_link);
  if (verifyLink) {
    const externalUrl =
      "https://sites.google.com/view/loviconnect-email-confirmed"; // Replace with your external URL
    res.redirect(externalUrl);
  }
  // return res.status(200).json({ success: "you account has been actived, you may login now." });
  else
    return res.status(400).json({
      error: "activation failed",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
}

export async function resetpwd(req, res) {
  let email = null;
  let username = null;
  const checkUsername = await userModel.checkUsername(req.params.input);
  if (!checkUsername[0]) {
    const checkEmail = await userModel.checkEmail(req.params.input);
    if (!checkEmail[0]) {
      return res.status(400).json({
        status: 400,
        message: "Interest list fetched",
        error: "Username or Email does not exist",
        data: [],
      });
    }
    email = checkEmail[0].email;
    username = checkEmail[0].username;
  } else {
    email = checkUsername[0].email;
    username = checkUsername[0].username;
  }
  const resetpwd_link = crypto.randomBytes(10).toString("hex");
  await userModel.updateResetpwdLink(username, resetpwd_link);
  await emailSender.resetpwd(email, username, resetpwd_link);
  return res.status(200).json({
    error: null,
    status: 200,
    message:
      "An email has been sent to your email, please check to reset your password",
    data: [],
  });
}

export async function verifyPwdLink(req, res) {
  const username = await userModel.verifyPwdLink(req.params.resetpwd_link);
  if (!username) {
    return res.status(400).json({
      error: "Link is not valid, you can make a new request",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Link validate, you can reset your password",
    data: username,
  });
}

export async function updatepwd(req, res) {
  await userModel.updatepwd(req.body.username, req.body.password);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Password updated, you may login now",
    data: [],
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!form_validator.isEmail(email)) {
    return res.status(400).json({
      error: "Please enter a correct email",
      status: 400,
      message: "Please enter a correct email address",
      data: [],
    });
  } else {
    const data = { email: email, password: password };
    const result = await userModel.login(data);
    console.log("...result");
    if (typeof result.err !== "undefined") {
      return res.status(400).json({
        error: result.err,
        status: 400,
        message: "Bad Request!",
        data: [],
      });
    } else {
      const token = jwtModel.generateToken(result.userid, result.username);
      return res.status(200).json({
        status: 200,
        message: "Sucessfully login",
        data: result,
        token: token,
        error: null,
      });
    }
  }
}

export async function authUser(req, res) {
  const result = await userModel.getUserInfoById(req.userid);
  if (typeof result.err !== "undefined") {
    return res.status(400).json({
      error: result.err,
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  } else {
    return res.status(200).json({
      data: result,
      error: null,
      status: 200,
      message: "Success!",
    });
  }
}

export async function logout(req, res) {
  await userModel.logout(req.userid);
  return res.status(200).json({
    data: [],
    error: null,
    status: 200,
    message: "User offline now!",
  });
}

export async function modifyAccount(req, res) {
  let data = {
    username: req.body.data.username,
    email: req.body.data.email,
    firstname: req.body.data.firstname,
  };
  const result = await userModel.modifyAccount(data, req.userid);
  if (typeof result !== "undefined")
    return res.status(400).json({
      error: result.err,
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  else
    return res.status(200).json({
      status: 200,
      error: null,
      message: "Account has been successfully updated",
      data: [],
    });
}

export async function getProfile(req, res) {
  if (
    typeof req.params.userid === "undefined" ||
    req.params.userid.length === 0
  ) {
    return res.status(400).json({
      error: "UserID missing",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  const getProfile = await userModel.getProfileInfoById(req.params.userid);
  if (getProfile.err)
    return res.status(400).json({
      error: getProfile.err,
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  else {
    if (req.userid != req.params.userid) {
      let data = {
        // notification: 'visits',
        id_user: req.params.userid,
        id_sender: req.userid,
      };
      const checkBlock = await userModel.checkBlock(
        data.id_user,
        data.id_sender,
      );
      if (checkBlock[0]) {
        return res.status(400).json({
          error:
            "You have blocked this user, you cannot check his/her profile anymore.",
          status: 400,
          message: "Bad Request!",
          data: [],
        });
      }
      // await userModel.addNotif(data);
      await userModel.addFame(1, data.id_user);
    }
    const result = await userModel.getProfileInfoById(req.params.userid);
    const interests = await userModel.getInterestsById(req.params.userid);
    result.interests = interests;
    const pictures = await userModel.getPictureById(req.params.userid);
    result.pictures = pictures;
    return res.status(200).json({
      status: 200,
      error: null,
      data: result,
      message: "User profile found",
    });
  }
}

export async function modifyProfile(req, res) {
  let data = req.body;
  data.id_user = req.userid;
  await userModel.modify_profile(data);
  return res.status(200).json({
    message: "Profile has been successfully updated",
    status: 200,
    error: null,
    data: [],
  });
}

export async function modifyLocation(req, res) {
  let data = req.body;
  data.id_user = req.userid;
  await userModel.modify_location(data);
  return res.status(200).json({
    status: 200,
    error: null,
    data: [],
    message: "Location has been successfully updated",
  });
}

export async function modifyInterests(req, res) {
  let data = {};
  data.id_user = req.userid;
  data.interest = req.body;
  await userModel.modifyInterests(data);
  res.status(200).json({
    status: 200,
    error: null,
    data: [],
    message: "Profile has been successfully updated",
  });
}

export async function setAllReaded(req, res) {
  await userModel.setAllReaded(req.userid);
  const result = await userModel.getNotif(req.userid);
  return res.status(200).json({
    status: 200,
    error: null,
    message: "All notifications set to read",
    data: result,
  });
}

export async function readNotif(req, res) {
  if (!Number.isInteger(+req.params.id_notif)) {
    return res.status(400).json({
      error: "NotifID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  await userModel.readNotif(req.params.id_notif);
  const result = await userModel.getNotif(req.userid);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Notification fetched",
    data: result,
  });
}

// export async function getHistory(req, res){
//     if(typeof req.params.userid !== "undefined" && req.params.userid.length === 36){
//         return res.status(400).json({error: "userID has to be a number."});
//     }
//     const result = await userModel.getHistory(req.params.userid);
//     return res.status(200).json({
//         data: result
//     });
// }

export async function checkLike(req, res) {
  if (
    typeof req.params.userid !== "undefined" &&
    req.params.userid.length === 36
  ) {
    return res.status(400).json({
      error: "userID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  const result = await userModel.checkLike(req.params.userid, req.userid);
  let like = false;
  let connected = false;
  if (result[0]) {
    like = true;
    const checklikeback = await userModel.checkLike(
      req.userid,
      req.params.userid,
    );
    if (checklikeback[0]) {
      connected = true;
    }
  }
  return res.status(200).json({
    error: null,
    status: 200,
    message: "USer connection fetched",
    data: {
      like: like,
      connected: connected,
    },
  });
}

export async function likeProfile(req, res) {
  if (
    typeof req.params.userid !== "undefined" &&
    req.params.userid.length === 36 &&
    req.params.loserid.length
  ) {
    return res.status(400).json({
      error: "userID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  if (req.userid != req.params.userid && req.userid != req.params.loserid) {
    let data = {
      // notification: 'likes',
      id_user: req.params.userid,
      id_sender: req.userid,
      id_loser: req.params.loserid,
    };
    const checklike = await userModel.checkLike(data.id_user, data.id_sender);
    if (checklike[0]) {
      return res.status(200).json({
        error: null,
        status: 200,
        message: "like fetched",
        data: {
          connected: false,
          success: "You have liked this user before",
        },
      });
    } else {
      await userModel.addLike(data.id_user, data.id_sender);
      await userModel.addFame(5, data.id_user);
      // await userModel.addNotif(data);
      const checklikeback = await userModel.checkLike(
        data.id_sender,
        data.id_user,
      );
      if (checklikeback[0]) {
        await chatModel.createChatroom(data.id_sender, data.id_user);
        return res.status(200).json({
          error: null,
          status: 200,
          message: "like fetched",
          data: {
            connected: true,
            success: "This user also likes you, now you can chat",
          },
        });
      } else
        return res.status(200).json({
          error: null,
          status: 200,
          message: "like fetched",
          data: {
            connected: false,
            success: "liked",
          },
        });
    }
  } else {
    return res.status(400).json({
      error: "You cannot like yourself",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
}

export async function blockUser(req, res) {
  if (
    typeof req.params.userid !== "undefined" &&
    req.params.userid.length === 36
  ) {
    return res.status(400).json({
      error: "userID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  if (req.userid != req.params.userid) {
    let data = {
      // notification: 'blocks',
      id_user: req.params.userid,
      id_sender: req.userid,
    };
    const checkBlock = await userModel.checkBlock(data.id_user, data.id_sender);
    if (checkBlock[0]) {
      return res.status(200).json({
        error: null,
        status: 200,
        message: "You have blocked this user before",
        data: [],
      });
    } else {
      await userModel.addBlock(data.id_user, data.id_sender);
      await userModel.unlike(data.id_user, data.id_sender);
      const chatroom = await chatModel.getChatroomId(
        data.id_sender,
        data.id_user,
      );
      if (chatroom) {
        await chatModel.unlinkChat(chatroom.id_chatroom);
      }
      await userModel.addFame(-50, data.id_user);
      // await userModel.addNotif(data);
      return res.status(200).json({
        error: null,
        status: 200,
        message:
          "You have blocked this user, all your history about this user has been deleted, and you cannot get any information from this user",
        data: [],
      });
    }
  } else {
    return res.status(400).json({
      error: "You cannot block yourself",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
}

export async function reportFake(req, res) {
  if (
    typeof req.params.userid !== "undefined" &&
    req.params.userid.length === 36
  ) {
    return res.status(400).json({
      error: "userID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  if (req.userid != req.params.userid) {
    let data = {
      // notification: 'blocks',
      id_user: req.params.userid,
      id_sender: req.userid,
    };
    const checkFake = await userModel.checkFake(data.id_user, data.id_sender);
    if (checkFake[0]) {
      return res.status(200).json({
        error: null,
        status: 200,
        message: "You have report this user as a fake account before",
        data: [],
      });
    } else {
      await userModel.addFake(data.id_user, data.id_sender);
      await userModel.addBlock(data.id_user, data.id_sender);
      await userModel.unlike(data.id_user, data.id_sender);
      const chatroom = await chatModel.getChatroomId(
        data.id_sender,
        data.id_user,
      );
      if (chatroom) {
        await chatModel.unlinkChat(chatroom.id_chatroom);
      }
      await userModel.addFame(-500, data.id_user);
      const count = await userModel.countFake(data.id_user);
      if (count >= 50) {
        //await userModel.deleteUser(data.id_user);
        await userModel.hibernateAccount("1", data.id_user);
        //Hibernate fake account
        return res.status(200).json({
          error: null,
          status: 200,
          data: [],
          message:
            "There are more than 50 users report this account as a fake account. This account has been hibernated!",
        });
      }
      return res.status(200).json({
        error: null,
        status: 200,
        data: [],
        message:
          "You have reported this user as a fake account, Thanks for your contribution",
      });
    }
  } else {
    return res.status(400).json({
      error: "You cannot block yourself",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
}

export async function unlikeProfile(req, res) {
  if (
    typeof req.params.userid !== "undefined" &&
    req.params.userid.length === 36
  ) {
    return res.status(400).json({
      error: "userID has to be a number.",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  if (req.userid != req.params.userid) {
    let data = {
      // notification: 'unlikes',
      id_user: req.params.userid,
      id_sender: req.userid,
    };
    const checklike = await userModel.checkLike(data.id_user, data.id_sender);
    if (!checklike[0]) {
      return res.status(400).json({
        error: "You have not liked this user before",
        status: 400,
        message: "Bad Request!",
        data: [],
      });
    } else {
      await userModel.unlike(data.id_user, data.id_sender);
      await userModel.addFame(-5, data.id_user);
      // await userModel.addNotif(data);
      const checklikeback = await userModel.checkLike(
        data.id_sender,
        data.id_user,
      );
      if (checklikeback[0]) {
        // means they are connected user
        const chatroom = await chatModel.getChatroomId(
          data.id_sender,
          data.id_user,
        );
        await chatModel.unlinkChat(chatroom.id_chatroom);
        return res.status(200).json({
          error: null,
          status: 200,
          data: {
            connected: false,
          },

          message:
            "You unlike this user, you are not connected anymore, all your previous messages has been destoryed",
        });
      } else
        return res.status(200).json({
          error: null,
          status: 200,
          message: "You have not liked this user before",
          data: {
            connected: false,
          },
        });
    }
  }
}

export async function getInterestsList(req, res) {
  const result = await userModel.getInterestsList();
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Interest list fetched",
    data: result,
  });
}

export async function uploadAvatar(req, res) {
  if (req.files == null) {
    return res.status(400).json({
      error: "No file was uploaded",
      status: 400,
      message: "Bad Request!",
      data: [],
    });
  }
  const file = req.files.file;
  const filename =
    req.userid + Date.now() + crypto.randomBytes(5).toString("hex");
  file.mv(`../user_images/${filename}`, (err) => {
    if (err) {
      return res.status(500).json({
        error: err,
        status: 500,
        message: "Bad request",
        data: [],
      });
    }
  });
  await userModel.uploadAvatar(
    req.userid,
    filename,
    //"http://localhost:3000/images/" + filename,
  );
  return res.status(200).json({
    error: null,
    status: 200,
    message: "You avatar has been updated successfully",
    data: [],
  });
}

export async function modifyPictures(req, res) {
  const getCurrent = await userModel.getPictureById(req.userid); //must have previous pics
  // if(req.body.length){
  for (let i = 0; i < getCurrent.length; i++) {
    let check = false;
    for (let ii = 0; ii < req.body.length; ii++) {
      if (getCurrent[i].path === req.body[ii].path) {
        check = true;
        break;
      }
    }
    if (check === false) {
      await userModel.deletePics(getCurrent[i].path);
    }
  }
  // }
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Picture modified successfully",
    data: [],
  });
}

export async function uploadPictures(req, res) {
  if (req.files == null) {
    return res.status(200).json({
      error: null,
      status: 200,
      message: "No picture found in requests",
      data: [],
    });
  }
  const files = req.files.file;

  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      const filename =
        req.userid + Date.now() + crypto.randomBytes(5).toString("hex");
      files[i].mv(`../user_images/${filename}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      await userModel.uploadPics(
        req.userid,
        filename,
        // "http://localhost:3000/images/" + filename,
      );
    }
  } else {
    const filename =
      req.userid + Date.now() + crypto.randomBytes(5).toString("hex");
    files.mv(`../user_images/${filename}`, (err) => {
      if (err) {
        return res.status(500).json({
          error: err,
          status: 200,
          message: "Success!",
          data: [],
        });
      }
    });
    await userModel.uploadPics(
      req.userid,
      filename,
      // "http://localhost:3000/images/" + filename,
    );
  }
  return res.status(200).json({
    error: null,
    status: 200,
    message: "File uploaded!",
    data: [],
  });
}

export async function getBlockList(req, res) {
  const result = await userModel.getBlockList(req.userid);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Block list fetched",
    data: result,
  });
}
export async function getLikeList(req, res) {
  const result = await userModel.getLikeList(req.userid);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Like list fetched",
    data: result,
  });
}

export async function getVisitList(req, res) {
  const result = await userModel.getVisitList(req.userid);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "Visit list fetched",
    data: result,
  });
}

export async function unBlockUser(req, res) {
  const userid = req.params.blockuserid;
  const blockerid = req.userid;
  await userModel.unBlockUser(userid, blockerid);
  await userModel.addFame(50, userid);
  return res.status(200).json({
    error: null,
    status: 200,
    message: "You have unblocked this user, you can now visit his profile",
    date: [],
  });
}

//Zodiac section
export async function getZodiacSign(dateOfBirth) {
  // Assuming dateOfBirth is in the format 'YYYY-MM-DD HH:mm:ss'
  const parsedDate = new Date(dateOfBirth);

  const month = parsedDate.getMonth() + 1; // JavaScript months are zero-based, so January is 0
  const day = parsedDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gemini";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  } else {
    return "Pisces";
  }
}

//get chatroom and message
