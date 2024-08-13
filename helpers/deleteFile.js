const fs = require("fs");
// file deleter function using fs in npm
const deleteFile = async (file, folder) => {
  // Filepath/name is retrieved
  const filename = `public/assets/${folder}/${file}`;
  // Unlink method is used to delete the targeted file
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
