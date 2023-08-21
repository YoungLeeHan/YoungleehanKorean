import User from "../models/User.js";
import {
    generateVerificationToken,
    sendVerificationEmail,
} from "../helpers/verificationEmail.js";
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

        const token = await generateVerificationToken(user);
        await sendVerificationEmail(user, token);

        res.json({
            registrationStatus: "success",
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
            const token = await generateVerificationToken(user);
            await sendVerificationEmail(user, token);

            return res.json({
                error: "Email Verfication Needed",
            });
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
