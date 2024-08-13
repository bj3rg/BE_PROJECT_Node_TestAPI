const multer = require("multer");

// List of folders to upload image
// KEY = the column name or field of the file
// VALUE = the location/path to upload the image
const uploadFolders = {
  user_img: "public/assets/profile-upload",
  pet_img: "public/assets/pet-upload",
};

// Initialize the storage in the server
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Declare the list of folders to upload to
    const uploadFolder = uploadFolders[file.fieldname];

    if (uploadFolder) {
      cb(null, uploadFolder);
    } else {
      cb(new Error("Invalid Fieldname"), false);
    }
  },
  filename: function (req, file, cb) {
    // Formatted date for naming the uploaded image
    const date = new Date();
    const hongKongOffset = 8 * 60; // Hong Kong is UTC+8
    const localTime = new Date(date.getTime() + hongKongOffset * 60000);
    const formattedDate =
      localTime.toISOString().replace(/:/g, "-").replace("Z", "") + "-";
    console.log(formattedDate);
    // Setting the image file to date.format() + original file name
    cb(null, formattedDate + file.originalname);
  },
});

// Function that enlist accepted file type/image type
const fileFilter = (req, file, cb) => {
  // Declare here the accepted image type like png,jpg,jpeg,etc.
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // DOCX
    file.mimetype === "application/pdf"
  ) {
    // Return nothing
    cb(null, true);
  } else {
    // Return error if file uploaded is not included
    cb(new Error("File format not supported"), false);
  }
};

// Multer configuration
const multerConfig = (req, res, next) => {
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    // Limit Size of the image sample below is 10mb
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }).fields([
    // Add here the file's field name/column name and max count of file to upload
    {
      name: "user_img",
      maxCount: 1,
    },
  ])(req, res, next);
};

module.exports = multerConfig;
