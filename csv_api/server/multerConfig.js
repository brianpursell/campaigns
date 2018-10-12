const multer = require("multer");
const path = require("path");
const csvUploadDir = path.join(__dirname, "../uploads/");

const storage = multer.diskStorage({
  destination: csvUploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.csv`);
  }
});

module.exports = multer({ storage: storage }).single("users_csv");
