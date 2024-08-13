const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = uploadFolders[file.fieldname];

    if (uploadFolder) {
      cb(null, uploadFolder);
    } else {
      cb(new Error("Invalid Fieldname"), false);
    }
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const hongKongOffset = 8 * 60; // Hong Kong is UTC+8
    const localTime = new Date(date.getTime() + hongKongOffset * 60000);
    const formattedDate =
      localTime.toISOString().replace(/:/g, "-").replace("Z", "") + "-";
    console.log(formattedDate);
    cb(null, formattedDate + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // DOCX
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"), false);
  }
};

const multerConfig = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }).fields([
    {
      name: "user_img",
      maxCount: 1,
    },
  ])(req, res, next);
};

module.exports = multerConfig;
