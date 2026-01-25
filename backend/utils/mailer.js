const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "APP_PASSWORD"
  }
});

module.exports.sendMail = (email, event) => {
  transporter.sendMail({
    to: email,
    subject: "Event Booking Confirmed",
    html: `<h2>Booking Confirmed</h2><p>${event}</p>`
  });
};
