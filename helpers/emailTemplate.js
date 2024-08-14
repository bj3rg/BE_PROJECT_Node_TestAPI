module.exports = {
  otpSenderTemplate: (OTP) =>
    `
              <html>
                <head>
                  <style>
                    /* Your existing styles for Verification Code email */
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>OTP Sender Test</h2>
                    <p>Your One-Time Password: ${OTP}</p>
                    <p style="font-size: 1.5em; font-weight: bold;"></p>
                    <p>If you did not make this request, you can safely ignore this email.</p>
                  </div>
                </body>
              </html>
            `,
};
