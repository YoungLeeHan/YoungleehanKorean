import User from "../models/User.js";
import Token from "../models/token.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../helpers/verificationEmail.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const pwReg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

    if (!firstName.trim()) {
      return res.json({ error: "First name is required" });
    }
    if (!lastName.trim()) {
      return res.json({ error: "Last name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || !pwReg.test(password)) {
      return res.json({
        error: "Invalid Password",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "This email is already registered." });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const verificationUrl = `http://localhost:3000/${user.id}/verify/${token.token}`;

    await sendVerificationEmail(
      user.email,
      "Verify Your Email Address",
      verificationUrl
    );

    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ error: "Email not valid" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Wrong password. Hint: 6 characters or more",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    if (!user.verified) {
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const verificationUrl = `http://localhost:3000/${user.id}/verify/${token.token}`;

      await sendVerificationEmail(
        user.email,
        "Verify Your Email Address",
        verificationUrl
      );

      return res
        .status(400)
        .send({ message: "A verification link sent to your email address." });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        country: user.country,
        _id: user._id,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      country,
      address1,
      address2,
      city,
      state,
      zipcode,
    } = req.body;

    const user = await User.findById(req.user._id);

    // check password length
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long.",
      });
    }

    // check if password matches
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password." });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        country: country,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode,
      },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    // await token.removeToken();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Verification failed. Internal Server Error" });
  }
};
