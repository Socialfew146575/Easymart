const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const receiveEmail = async (options) => {
  const textContent = `${options.message} \n\n From, \n ${options.firstName} ${options.lastName}`;

  const mailOptions = {
    from: process.env.SMTP_MAIL, // Use your authenticated Gmail address
    to: process.env.SMTP_MAIL, // Send to the same Gmail address
    replyTo: options.email, // Reply to the user's email
    subject: options.subject,
    text: textContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = receiveEmail;
