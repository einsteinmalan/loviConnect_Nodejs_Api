const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/storage_videos/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 20000000 }, // Limit file size to 20MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("video");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /mp4|avi|m4v|mpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: video only!");
  }
}

module.exports = upload;
