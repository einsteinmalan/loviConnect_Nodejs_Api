const app = require("express")();
const express = require("express");
var http = require("http").Server(app);

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const authSocket = require("./middleware/authSocket");
const chatController = require("./controllers/chatController");
const userModel = require("./models/user");
const generateUser = require("./config/generateUsers");

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
const adminRoute = require("./routes/AdminRoutes");
const adminSettingRoute = require("./routes/AdminSettingsRoutes");
const blockRoute = require("./routes/blockRoute");
const boosterRoute = require("./routes/BoosterRoutes");
const fakeRoute = require("./routes/FakeRoutes");
const galleryRoute = require("./routes/GalleryRoutes");
const inviteDatingQuotaRoute = require("./routes/InviteDatingsQuotasRoutes");
const inviteDatingRoute = require("./routes/InviteDatingsRoutes");
const personalityTestQuestionRoute = require("./routes/PersonalityTestQuestionRoutes");
const profileRoute = require("./routes/ProfileRoutes");
const randomCallQuotaRoute = require("./routes/RandomCallQuotasRoutes");
const randomCallRoute = require("./routes/RandomCallsRoutes");
const supportRoute = require("./routes/SupportRoutes");
const systemBlockRoute = require("./routes/SysBlockRoutes");
const userFilterRoute = require("./routes/UserFiltersRoutes");
const userPersonalityTestRoute = require("./routes/UserPersonalityTestRoutes");
const userSettingRoute = require("./routes/UserSettingsRoutes");
const userInterestRoute = require("./routes/UsersInterestsRoutes");
const versusWinsRoute = require("./routes/VersusWinsRoutes");

// routing
app.use("/user/", userRoute);
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

app.get("/generate", (req, res) => {
  generateUser.generateUser();
  res.send({ message: "1000 Users generated" });
});

const PORT = 3000;

// starting server
const server = http.listen(PORT, () => {
  console.log(`Node server running on port: ${PORT}`);
});

//socket
const io = require("socket.io").listen(server);
io.on("connection", (socket) => {
  // console.log(`Socket ${socket.id} connected.`);
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
