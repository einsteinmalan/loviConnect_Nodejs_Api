// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");
// const auth = require("../middleware/auth");

// const multer = require("multer");

// const storage = multer.diskStorage({
//   // Place of picture
//   destination: (request, file, callback) => {
//     const uploadDir = "user_images/";
//     // Create the directory if it does not exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     callback(null, uploadDir);
//   },
//   filename: (request, file, callback) => {
//     const avatarName = Date.now() + file.originalname;
//     callback(null, avatarName);
//   },
// });

// const uploadImage = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 }, // limit size to 10MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// //connect
// router.route("/register").post(userController.register);
// router.route("/active/:active_link").post(userController.active);
// router.route("/login").post(userController.login);
// router.route("/auth/:userid").get(auth, userController.authUser);
// router.route("/resetpwd/:input").get(userController.resetpwd);
// router.route("/verifypwdlink/:resetpwd_link").get(userController.verifyPwdLink);
// router.route("/updatepwd").post(userController.updatepwd);
// router.route("/logout/:userid").get(auth, userController.logout);
// router.route("/profile/create").post(auth, userController.createUserProfile);

// //getInfo
// router.route("/account/:userid").get(auth, userController.getAccount);
// router.route("/profile/:userid").get(auth, userController.getProfile);
// router.route("/interests_list").get(userController.getInterestsList);

// //notification
// router.route("/notif/read/:id_notif").get(auth, userController.readNotif);
// router.route("/notif/allreaded").get(auth, userController.setAllReaded);
// router.route("/checklike/:userid").get(auth, userController.checkLike);
// router.route("/like/:userid/:loserid").post(auth, userController.likeProfile);
// router.route("/unlike/:userid").post(auth, userController.unlikeProfile);
// router.route("/block/:userid").post(auth, userController.blockUser);
// router.route("/reportfake/:userid").post(auth, userController.reportFake);
// router.route("/blocklist").get(auth, userController.getBlockList);
// router.route("/likelist").get(auth, userController.getLikeList);
// router.route("/visitlist").get(auth, userController.getVisitList);
// router.route("/unblock/:blockuserid").post(auth, userController.unBlockUser);

// //modify
// router
//   .route("/modify/account/:userid")
//   .post(auth, userController.modifyAccount);
// router.route("/modify/profile").post(auth, userController.modifyProfile);
// router.route("/modify/interests").post(auth, userController.modifyInterests);
// router.route("/modify/pictures").post(auth, userController.modifyPictures);
// router.route("/modify/location").post(auth, userController.modifyLocation);

// router.route("/upload/avatar").post(auth, userController.uploadAvatar);
// router.route("/upload/pictures").post(auth, userController.uploadPictures);
// router
//   .route("/upload/user-picture")
//   .post(auth, uploadImage.single("image"), userController.saveUserPic);

// module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, userController.createUser);
router.get("/", authMiddleware.authenticateToken, userController.getUsers);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userController.getUserById,
);
router.put("/:id", authMiddleware.authenticateToken, userController.updateUser);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  userController.deleteUser,
);

module.exports = router;
