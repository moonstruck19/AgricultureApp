const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = {
    verifyUserEmail: async function verifyUserEmail(userEmail, token) {
        try {
            let info = await transporter.sendMail({
                from: `"Agriculture App" lamborghininguyn@gmail.com`, 
                to: userEmail,
                subject: "Password Reset Request", 
                text: `Hello, you requested a password reset. Your reset token is: ${token}. This token is valid for 1 hour.`, // Email body (plain text)
                html: `<p>Hello,</p>
                       <p>You requested a password reset. Your reset token is:</p>
                       <h3>${token}</h3>
                       <p>This token is valid for 1 hour.</p>`, 
            });

            console.log(`Email sent to ${userEmail}, Message ID: ${info.messageId}`);
        } catch (err) {
            console.error(`Error sending email to ${userEmail}:`, err);
            throw new Error("Failed to send email.");
        }
    },
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
};
