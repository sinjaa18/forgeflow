import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.json({ msg: "User exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashed,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "user not exists" });
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7h",
        });
        res.json({ token, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
