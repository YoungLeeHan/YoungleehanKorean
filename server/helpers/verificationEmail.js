import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/User.js";
import Token from "../models/token.js";
import crypto from "crypto";

dotenv.config();

export const generateVerificationToken = async (user) => {
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  return token;
};

export const sendVerificationEmail = async (user, token) => {
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

    const verificationUrl = `http://localhost:3000/${user.id}/verify/${token.token}`;

    const mailOptions = {
      from: process.env.NODE_MAILER_ID,
      to: user.email,
      subject: "Verify Your Email Address",
      html: `
        <p>Click the following link to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
		    <p>The link will expire in 10 minutes.</p>
      `,
    };

    smtpTransport.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to send email" });
      } else {
        res.status(200).json({ message: "Email sent successfully" });
      }
      smtpTransport.close();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!user) return res.status(400).send({ message: "No such user" });

    if (!token)
      return res.status(400).send({ message: "No token for the user" });

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Verification failed. Internal Server Error",
    });
  }
};
