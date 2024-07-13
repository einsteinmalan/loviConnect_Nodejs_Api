const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blockRoutes = require("./routes/blockRoute");
const sysBlockRoutes = require("./routes/sysBlockRoutes");
const chatroomRoutes = require("./routes/chatroomRoutes");
const fakeProfileRoutes = require("./routes/fakeProfileRoutes");
const fakeRoutes = require("./routes/fakeRoutes");
const interestRoutes = require("./routes/interestRoutes");
const likeRoutes = require("./routes/liekRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const picRoutes = require("./routes/picRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const picVerificationRoutes = require("./routes/picVerificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ticketTypeRoutes = require("./routes/ticketTypeRoutes");
const replyRoutes = require("./routes/replyRoutes");
const supportRoutes = require("./routes/supportRoutes");
const personalityTestQuestionRoutes = require("./routes/personalityTestQuestionRoutes");
const userPersonalityTestRoutes = require("./routes/userPersonalityTestRoutes");
const userInterestRoutes = require("./routes/userInterestRoutes");
const randomCallRoutes = require("./routes/randomCallRoutes");
const inviteDatingRoutes = require("./routes/inviteDatingRoutes");
const randomCallQuotaRoutes = require("./routes/randomCallQuotaRoutes");
const inviteDatingQuotaRoutes = require("./routes/inviteDatingQuotaRoutes");
const boosterRoutes = require("./routes/boosterRoutes");
const userSettingRoutes = require("./routes/userSettingRoutes");
const userFilterRoutes = require("./routes/userFilterRoutes");
const versusWinRoutes = require("./routes/versusWinRoutes");
const proUserRoutes = require("./routes/proUserRoutes");
const adminSettingRoutes = require("./routes/adminSettingRoutes");
const userRoutes = require("./routes/userRoute");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/blocks", blockRoutes);
app.use("/sys-blocks", sysBlockRoutes);
app.use("/chatrooms", chatroomRoutes);
app.use("/fake-profiles", fakeProfileRoutes);
app.use("/fakes", fakeRoutes);
app.use("/interests", interestRoutes);
app.use("/likes", likeRoutes);
app.use("/messages", messageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/pics", picRoutes);
app.use("/galleries", galleryRoutes);
app.use("/pic-verifications", picVerificationRoutes);
app.use("/admins", adminRoutes);
app.use("/ticket-types", ticketTypeRoutes);
app.use("/replies", replyRoutes);
app.use("/supports", supportRoutes);
app.use("/personality-test-questions", personalityTestQuestionRoutes);
app.use("/user-personality-tests", userPersonalityTestRoutes);
app.use("/user-interests", userInterestRoutes);
app.use("/random-calls", randomCallRoutes);
app.use("/invite-datings", inviteDatingRoutes);
app.use("/random-call-quotas", randomCallQuotaRoutes);
app.use("/invite-dating-quotas", inviteDatingQuotaRoutes);
app.use("/boosters", boosterRoutes);
app.use("/user-settings", userSettingRoutes);
app.use("/user-filters", userFilterRoutes);
app.use("/versus-wins", versusWinRoutes);
app.use("/pro-users", proUserRoutes);
app.use("/admin-settings", adminSettingRoutes);
app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and models synchronized.");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
