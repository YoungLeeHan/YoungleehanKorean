import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async (email, subject, content) => {
  try {
    const smtpTransport = nodemailer.createTransport({
      service: process.env.NODE_MAILER_SERVICE,
      auth: {
        user: process.env.NODE_MAILER_ID,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.NODE_MAILER_ID,
      to: email,
      subject: subject,
      html: content,
    };

    smtpTransport.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent!");
        res.status(200).json({ message: "Email sent successfully" });
      }
      smtpTransport.close();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
