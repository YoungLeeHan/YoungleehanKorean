import User from "../models/User.js";
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
            return res.json({ error: "Email is taken" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                address: user.address,
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
                error: "Password must be at least 6 characters long",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User not found" });
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
                address: user.address,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};

export const secret = async (req, res) => {
    res.json({ currentUser: req.user });
};
