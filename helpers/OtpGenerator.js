const generateOTP = require("otp-generator");

function randomCode() {
  return generateOTP.generate(6, {
    digits: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
}

module.exports = randomCode;
