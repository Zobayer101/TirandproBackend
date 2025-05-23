const multer = require("multer");
const path = require("path");
const upPath = `./public/Coverphoto/`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upPath);
  },
  filename: (req, file, cb) => {
    const fileExtintion = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExtintion, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExtintion);
  },
});

let upload = multer({
  storage,
  limits: {
    fileSize: 50000000,
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    }
  },
});

module.exports = upload;
