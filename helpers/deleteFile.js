const fs = require("fs");

const deleteFile = async (file, folder) => {
  const filename = `public/assets/${folder}/${file}`;
  await fs.unlink(filename, (err) => {
    if (err) {
      console.log(err);
      console.error(err);
      return err;
    }
    console.log("Image Deleted Successfully");
  });
};

module.exports = deleteFile;
