const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const emailTemplate = require("./emailTemplate");
dotenv.config();

// Developers or Handlers part, data
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_USER,
  port: 587,
  service: "gmail",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Mail with defined transport object
module.exports = sendOTP = (email, OTP) => {
  const htmlMessage = emailTemplate.otpSenderTemplate(OTP);

  return transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Verification Code", // Subject line
    html: htmlMessage, // html body
  });
};
