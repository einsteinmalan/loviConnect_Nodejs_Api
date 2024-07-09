const app = require("express")();
const express = require("express");
var http = require("http").Server(app);
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(process.env.TWILIO_ACCOUNT_SID);
const client = require("twilio")(accountSid, authToken);
const crypto = require("crypto");
const smsKey = process.env.SMS_SECRET_KEY;
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

let refreshTokens = [];

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const authSocket = require("./middleware/authSocket");
const chatController = require("./controllers/chatController");
const userModel = require("./models/user");
const generateUser = require("./config/generateUsers");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3232", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// User can read pictures from it
app.use("/user_images", express.static("user_images"));
app.use("/storage_gallery", express.static("storage_gallery"));
app.use("/storage_chat", express.static("storage_chat"));
app.use("/storage_videos", express.static("storage_videos"));
app.use("/storage_audios", express.static("storage_audios"));
app.use("/storage_ads", express.static("storage_ads"));
app.use("/support_image", express.static("support_image"));

// include router
const userRoute = require("./routes/userRoute");
const indexRoute = require("./routes/indexRoute");
const chatRoute = require("./routes/chatRoute");
const adminRoute = require("./routes/adminRoutes");
const adminSettingRoute = require("./routes/adminSettingRoutes");
const blockRoute = require("./routes/blockRoute");
const boosterRoute = require("./routes/boosterRoutes");
const fakeRoute = require("./routes/fakeProfileRoutes");
const galleryRoute = require("./routes/galleryRoutes");
const inviteDatingQuotaRoute = require("./routes/inviteDatingQuotaRoutes");
const inviteDatingRoute = require("./routes/inviteDatingRoutes");
const personalityTestQuestionRoute = require("./routes/personalityTestQuestionRoutes");
const profileRoute = require("./routes/profileRoutes");
const randomCallQuotaRoute = require("./routes/randomCallQuotaRoutes");
const randomCallRoute = require("./routes/randomCallRoutes");
const supportRoute = require("./routes/supportRoutes");
const systemBlockRoute = require("./routes/sysBlockRoutes");
const userFilterRoute = require("./routes/userFilterRoutes");
const userPersonalityTestRoute = require("./routes/userPersonalityTestRoutes");
const userSettingRoute = require("./routes/userSettingRoutes");
const userInterestRoute = require("./routes/userInterestRoutes");
const versusWinsRoute = require("./routes/versusWinRoutes");
const { getAccount } = require("./controllers/userController_copy");
const { error } = require("console");

// routing
app.use("/users/", userRoute);
app.use("/index/", indexRoute);
app.use("/chat/", chatRoute);
app.use("/admin/", adminRoute);
app.use("/admin-settings/", adminSettingRoute);
app.use("/blocked/", blockRoute);
app.use("/booster/", boosterRoute);
app.use("/fake/", fakeRoute);
app.use("/gallery/", galleryRoute);
app.use("/invite-quota/", inviteDatingQuotaRoute);
app.use("/invite-dating/", inviteDatingRoute);
app.use("/personality-questions/", personalityTestQuestionRoute);
app.use("/profile/", profileRoute);
app.use("/random-call-quta/", randomCallQuotaRoute);
app.use("/random-call/", randomCallRoute);
app.use("/support/", supportRoute);
app.use("/system-block-route/", systemBlockRoute);
app.use("/user-filter/", userFilterRoute);
app.use("/user-personality-test/", userPersonalityTestRoute);
app.use("/user-settings/", userSettingRoute);
app.use("/user-interest/", userInterestRoute);
app.use("/versus-win/", versusWinsRoute);

//======================   START   ===============================

const generateRefreshTokenID = () => {
  return crypto.randomBytes(16).toString("hex"); // Generate a 32-character hexadecimal string (128 bits)
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const result = await userModel.createUserSession(user.id, refreshToken);

  return refreshToken;
};

app.post("auth/token", (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({
      message: "No token provided",
      status: 401,
      data: [],
    });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Invalid refresh token",
        status: 403,
        data: [],
      });

    const result = await userModel.getUserSessions(token);
    if (result.length === 0) {
      return res.status(403).json({
        message: "Invalid refresh token",
        status: 403,
        data: [],
      });
    }

    if (result.error) {
      return res
        .status(403)
        .json({ message: result.error, status: 403, data: [], error: true });
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      phone: user.phone,
    });
    return res.status(201).json({
      accessToken: newAccessToken,
      status: 201,
      data: [],
    });
  });
});

app.post("/auth/resend-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const result = await userModel.verifyExistPhone(phone);

  if (result[0]) {
    const res = await userModel.updateUserOtp(otp, result[0].id);

    if (!res.error) {
      client.messages
        .create({
          body: `Your OTP for LoviConnect is ${otp}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        })
        .then(() => {
          res.status(201).json({
            message: "User created. OTP sent to phone.",
            status: 201,
            data: [],
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error sending OTP " + err,
            status: 500,
            data: [],
          });
        });
    } else {
      return res.status(500).json({
        message: "Error sending OTP \n",
        status: 500,
        data: [],
      });
    }
  }
});

app.post("/auth/register", async (req, res) => {
  const { fullName, phone } = req.body;
  //const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp = "123456";
  console.log("Phone", phone);
  console.log("Fullname", fullName);

  //const result = await userModel.verifyExistPhone(phone);
  const result = { error: "Some error dummy here" };
  console.log("Result-1", result);

  if (result.error) {
    return res.status(500).json({
      message: result.error,
      status: 500,
      data: [],
    });
  } else {
    if (result[0]) {
      //Account exist already
      const res = await userModel.updateUserOtp(otp, result[0].id);
      if (!res.error) {
        return res.status(201).json({
          message: "User created. OTP sent to phone.",
          status: 201,
          data: result,
        });
        // client.messages
        //   .create({
        //     body: `Your OTP for LoviConnect is ${otp}`,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     to: phone,
        //   })
        //   .then(() => {
        //     res.status(201).json({
        //       message: "User created. OTP sent to phone.",
        //       status: 201,
        //       data: [],
        //     });
        //   })
        //   .catch((err) => {
        //     res.status(500).json({
        //       message: "Error sending OTP " + err,
        //       status: 500,
        //       data: [],
        //     });
        //   });
      } else {
        return res.status(500).json({
          message: "Error sending OTP \n",
          status: 500,
          data: [],
        });
      }
    } else {
      //Account doesn't exist yet
      const resultat = await userModel.createUser(fullName, phone);
      if (resultat.id) {
        const res = await userModel.updateUserOtp(otp, resultat[0].id);
        if (!res.error) {
          return res.status(201).json({
            message: "User registered. OTP sent to phone.",
            status: 201,
            data: { id: resultat.id },
          });
          // client.messages
          //   .create({
          //     body: `Your OTP for LoviConnect is ${otp}`,
          //     from: process.env.TWILIO_PHONE_NUMBER,
          //     to: phone,
          //   })
          //   .then(() => {
          //     return res.status(201).json({
          //       message: "User registered. OTP sent to phone.",
          //       status: 201,
          //       data: [],
          //     });
          //   })
          //   .catch((err) => {
          //     res.status(500).json({
          //       message: "Error sending OTP \n" + err,
          //       status: 500,
          //       data: [],
          //     });
          //   });
        } else {
          return res.status(500).json({
            message: "Error sending OTP \n" + error,
            status: 500,
            data: [],
          });
        }
      } else {
        return res.status(500).json({
          message: "Error creating profile",
          status: 500,
          data: [],
        });
      }
    }
  }
});

app.post("auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  db.query(
    "SELECT * FROM users WHERE phone = ? AND otp = ?",
    [phone, otp],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: err, status: 500, data: [] });
      if (results.length === 0) {
        return res.status(400).json({
          message: "Invalid OTP",
          status: 400,
          data: [],
        });
      }
      db.query(
        "UPDATE users SET verified = 1, otp = null WHERE phone = ?",
        [phone],
        (err) => {
          if (err) throw err;
          res
            .status(200)
            .json({ message: "Phone number verified", status: 200, data: [] });
        },
      );
    },
  );
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "No token provided",
      status: 401,
      data: [],
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Invalid token", status: 403, data: [] });
    req.user = user;
    next();
  });
};

// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "Protected route accessed", user: req.user });
// });

//-----------------Another one ---------------------------------

// app.post("/auth/sendOTP", (req, res) => {
//   const phone = req.body.phone;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const ttl = 2 * 60 * 1000;
//   const expires = Date.now() + ttl;
//   const data = `${phone}.${otp}.${expires}`;
//   const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
//   const fullHash = `${hash}.${expires}`;

//   client.messages
//     .create({
//       body: `Your one time login Password For LoviConnect is ${otp}`,
//       //from: twilioNum,
//       to: phone,
//     })
//     .then((messages) => {
//       //console.log(messages);
//     })
//     .catch((err) => console.error(err));

//   // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
//   res
//     .status(200)
//     .send({ phone, hash: fullHash, status: 200, message: "OTP sent!" }); // Use this way in Production
// });

// app.post("/auth/verifyOTP", async (req, res) => {
//   const phone = req.body.phone;
//   const fullname = req.body.fullName;
//   const hash = req.body.hash;
//   const otp = req.body.otp;
//   let [hashValue, expires] = hash.split(".");
//   const registerTokenId = generateRefreshTokenID();

//   let now = Date.now();
//   if (now > parseInt(expires)) {
//     return res.status(504).send({
//       message: "Timeout. Please try again",
//       status: 504,
//       data: [],
//     });
//   }
//   let data = `${phone}.${otp}.${expires}`;
//   let newCalculatedHash = crypto
//     .createHmac("sha256", smsKey)
//     .update(data)
//     .digest("hex");
//   if (newCalculatedHash === hashValue) {
//     const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
//       expiresIn: "15m",
//     });
//     const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, {
//       expiresIn: "1y",
//     });
//     refreshTokens.push(refreshToken);

//     const result = await userModel.verifyExistPhone(phone);
//     if (result[0]) {
//       //User account already exist
//       res
//         .status(202)
//         .cookie("accessToken", accessToken, {
//           expires: new Date(new Date().getTime() + 30 * 1000),
//           sameSite: "strict",
//           httpOnly: true,
//         })
//         .cookie("refreshToken", refreshToken, {
//           expires: new Date(new Date().getTime() + 31557600000),
//           sameSite: "strict",
//           httpOnly: true,
//         })
//         .cookie("authSession", true, {
//           expires: new Date(new Date().getTime() + 30 * 1000),
//           sameSite: "strict",
//         })
//         .cookie("refreshTokenID", registerTokenId, {
//           expires: new Date(new Date().getTime() + 31557600000),
//           sameSite: "strict",
//         })
//         .send({
//           message: "Device verified",
//           status: 202,
//           accountExist: true,
//           data: [],
//           error: null,
//         });
//     } else {
//       //User account doesn't exist yet
//       if (fullname) {
//         const resultat = await userModel.createUser(
//           fullname,
//           phone,
//           registerTokenId,
//         );
//         if (!resultat.error) {
//           res
//             .status(202)
//             .cookie("accessToken", accessToken, {
//               expires: new Date(new Date().getTime() + 30 * 1000),
//               sameSite: "strict",
//               httpOnly: true,
//             })
//             .cookie("refreshToken", refreshToken, {
//               expires: new Date(new Date().getTime() + 31557600000),
//               sameSite: "strict",
//               httpOnly: true,
//             })
//             .cookie("authSession", true, {
//               expires: new Date(new Date().getTime() + 30 * 1000),
//               sameSite: "strict",
//             })
//             //generateRefreshTokenID
//             //.cookie("refreshTokenID", true, {
//             .cookie("refreshTokenID", registerTokenId, {
//               expires: new Date(new Date().getTime() + 31557600000),
//               sameSite: "strict",
//             })
//             .send({
//               message: "Device verified",
//               status: 202,
//               data: [],
//               accountExist: false,
//               error: null,
//             });
//         } else {
//           res.status(400).send({
//             message: resultat.error,
//             status: 400,
//             data: [],
//             error: resultat.error,
//           });
//         }
//       } else {
//         res.status(400).send({
//           message: "Bad request",
//           status: 400,
//           data: [],
//           error: "Bad request",
//         });
//       }
//     }
//   } else {
//     return res.status(400).send({ verification: false, msg: "Incorrect OTP" });
//   }
// });

// app.post("/home", authenticateUser, (req, res) => {
//   res.status(202).send("Private Protected Route - Home");
// });

// async function authenticateUser(req, res, next) {
//   const accessToken = req.cookies.accessToken;

//   jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
//     if (phone) {
//       req.phone = phone;
//       next();
//     } else if (err.message === "TokenExpiredError") {
//       return res.status(403).send({
//         success: false,
//         msg: "Access token expired",
//         status: 403,
//         err: "Access token expired",
//       });
//     } else {
//       return res
//         .status(403)
//         .send({ err, msg: "User not authenticated", status: 403 });
//     }
//   });
// }

// app.post("/auth/refresh", (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken)
//     return res
//       .status(403)
//       .send({ message: "Refresh token not found, login again" });
//   if (!refreshTokens.includes(refreshToken))
//     return res
//       .status(403)
//       .send({ message: "Refresh token blocked, login again" });

//   jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
//     if (!err) {
//       const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
//         expiresIn: "15m",
//       });
//       return res
//         .status(200)
//         .cookie("accessToken", accessToken, {
//           expires: new Date(new Date().getTime() + 30 * 1000),
//           sameSite: "strict",
//           httpOnly: true,
//         })
//         .cookie("authSession", true, {
//           expires: new Date(new Date().getTime() + 30 * 1000),
//           sameSite: "strict",
//         })
//         .send({ previousSessionExpired: true, success: true });
//     } else {
//       return res.status(403).send({
//         success: false,
//         msg: "Invalid refresh token",
//       });
//     }
//   });
// });

// app.get("/auth/logout", (req, res) => {
//   res
//     .clearCookie("refreshToken")
//     .clearCookie("accessToken")
//     .clearCookie("authSession")
//     .clearCookie("refreshTokenID")
//     .send("logout");
// });

//=======================   END   ==============================

app.get("/generate-fake", (req, res) => {
  generateUser.generateUser();
  res.send({ message: "1000 Users generated" });
});

const PORT = 3000;

// starting server
const server = http.listen(process.env.PORT, () => {
  console.log(`Node server running on port: ${PORT}`);
});

//socket
const io = require("socket.io").listen(server);
io.on("connection", (socket) => {
  socket.on("joinRoom", async ({ token, id_chatroom }, callback) => {
    const { userid, error } = await authSocket.authSocket(token);
    if (error) return callback(error);
    const checkUser = await chatController.checkUserByChatroomId(
      id_chatroom,
      userid,
    );
    if (checkUser.error) {
      return callback(error);
    }
    socket.join(id_chatroom);
    const result = await chatController.getMessages(id_chatroom);
    socket.emit("getMessage", result);
  });
  socket.on("requestChatNotif", async (token, callback) => {
    const { userid, error } = await authSocket.authSocket(token);
    if (error) return callback(error);
    const chatNotif = await chatController.getUnread(userid);
    socket.emit("getChatNotif", {
      id_receiver: userid,
      data: chatNotif,
    });
  });
  socket.on(
    "addMessage",
    async ({ id_chatroom, newMessage, token }, callback) => {
      const { userid, error } = await authSocket.authSocket(token);
      if (error) return callback(error);
      const id_receiver = await chatController.addMessage(
        id_chatroom,
        userid,
        newMessage,
      );
      const result = await chatController.getMessages(id_chatroom);
      const chatNotif = await chatController.getUnread(id_receiver);
      socket.emit("getMessage", result);
      socket.broadcast.emit("getChatNotif", {
        id_receiver: id_receiver,
        data: chatNotif,
      });
      socket.broadcast.to(id_chatroom).emit("getMessage", result);
    },
  );
  socket.on("readChatNotif", async ({ token, id_chatroom }, callback) => {
    const { userid, error } = await authSocket.authSocket(token);
    if (error) return callback(error);
    await chatController.setMessageReaded(id_chatroom, userid);
    const chatNotif = await chatController.getUnread(userid);
    socket.emit("getChatNotif", {
      id_receiver: userid,
      data: chatNotif,
    });
  });
  socket.on("requestNotif", async (token, callback) => {
    const { userid, error } = await authSocket.authSocket(token);
    if (error) return callback(error);
    const notif = await userModel.getNotif(userid);
    socket.emit("getNotif", {
      id_receiver: userid,
      data: notif,
    });
  });
  socket.on("addNotif", async (data) => {
    const checkBlock = await userModel.checkBlock(data.id_user, data.id_sender);
    if (!checkBlock[0]) {
      await userModel.addNotif(data);
      const notif = await userModel.getNotif(data.id_user);
      socket.broadcast.emit("getNotif", {
        id_receiver: data.id_user,
        data: notif,
      });
    }
  });
});
