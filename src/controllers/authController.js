const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const generateUsersAndProfiles = require("../utils/generateUsersAndProfiles");
const checkProUser = require("../utils/checkProUser");
const applyFilters = require("../utils/applyFilters");
const fetchRandomUsers = require("../utils/fetchRandomUsers");
const Block = require("../models/block");
const VersusWin = require("../models/versusWin");
const SysBlock = require("../models/sysBlock");
const Profile = require("../models/profile");

const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = (phone, otp) => {
  return twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

const generateAccessToken = (user) => {
  console.log("ACCESS_TOKEN_SECRET", process.env.ACCESS_TOKEN_SECRET);
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  console.log("REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET);
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerOrLogin = async (req, res) => {
  const { phone, fullName } = req.body;

  try {
    let user = await User.findOne({ where: { phone } });

    if (!user) {
      user = await User.create({
        id: require("uuid").v4(),
        phone,
        fullname: fullName,
      });
    }

    const otp = generateOTP();
    //Uncomment below when going live
    //user.otp = otp;
    user.otp = "123456";
    await user.save();

    /// uncomment the line below when going live
    //await sendOTP(phone, otp);

    res.status(200).json({
      message: "OTP sent to phone number",
      status: 200,
      error: null,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: 500,
      data: {},
    });
  }
};

// exports.resendOtp = async (req, res) => {
//   const { phone } = req.body;

//   try {
//     let user = await User.findOne({ where: { phone } });

//     if (!user) {
//       user = await User.create({
//         id: require("uuid").v4(),
//         phone,
//         fullname: fullName,
//       });
//     }

//     const otp = generateOTP();
//     //Uncomment below when going live
//     //user.otp = otp;
//     user.otp = "123456";
//     await user.save();

//     /// uncomment the line below when going live
//     //await sendOTP(phone, otp);

//     res.status(200).json({ message: "OTP sent to phone number" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ where: { phone: phone, otp: otp } });

    console.log("User", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid OTP",
        status: 400,
        error: "Invalid otp",
        data: {},
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log("AccessToken", accessToken);
    console.log("RefreshToken", refreshToken);

    user.refreshtokenid = refreshToken;

    user.is_verified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({
      status: 200,
      error: null,
      message: "Login successfull!",
      // data: user,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: user.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: 500,
      data: {},
    });
  }
};

exports.generateUsersAndProfiles = async (req, res) => {
  try {
    await generateUsersAndProfiles();
    res.status(200).json({
      message:
        "1000 users, profiles, and fake profiles have been generated successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      status: 400,
      error: "No token provided",
      data: {},
    });
  }

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findByPk(payload.userId);

    if (!user || user.refreshtokenid !== token) {
      return res.status(403).json({
        message: "Invalid refresh token",
        status: 403,
        error: "Invalid refresh token",
        data: {},
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshtokenid = refreshToken;
    await user.save();

    res.status(200).json({
      status: 200,
      error: null,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: user.id,
      },
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid token",
      error: "Invalid token",
      status: 403,
      error: null,
      data: {},
    });
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const N = await checkProUser(userId);

    // Fetch initial random users
    let randomUsers = await fetchRandomUsers(N, []);

    // Apply filtering logic with prioritization
    randomUsers = await applyFilters(req.user, randomUsers);

    // Fetch and combine user and profile data
    const result = await Promise.all(
      randomUsers.map(async (u) => {
        const profile = await Profile.findOne({ where: { id_user: u.id } });
        return {
          user: u,
          profile: profile,
        };
      }),
    );

    res.status(200).json({ users: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
