import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
        res.json('sign up successful');
    } catch (err) {
        next(err);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found."));

        }
        const { password: pass, ...remainingFields } = validUser._doc;
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"));

        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(remainingFields);
    } catch (err) {
        next(err);
    }
}

export const oAuthSignin = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    if (!name || !email || name === "" || email === "") {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...remainingFields } = user._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(remainingFields);

        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...remainingFields } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(remainingFields);

        }

    } catch (err) {
        next(err);
    }
}