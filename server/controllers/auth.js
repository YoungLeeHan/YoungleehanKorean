import User from "../models/User.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
//Test
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName.trim()) {
            return res.json({ error: "Name is required" });
        }
        if (!lastName.trim()) {
            return res.json({ error: "Name is required" });
        }
        if (!email) {
            return res.json({ error: "Email is taken" });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password must be at least 6 characters long",
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

        res.json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                address: user.address,
            },
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
            return res.json({ error: "Email is taken" });
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

        res.json({
            user: {
                firstName: user.firstName,
                email: user.email,
                role: user.role,
                address: user.address,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
