import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        res.status(400).json({ message: "All fields are required" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
        res.json('sign up successful');
    } catch (err) {
        res.status(500).json(err.message);

    }
}