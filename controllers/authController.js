import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("Account already exists! Please login.");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send(err.message);

                const newUser = new User({
                    email,
                    password: hash,
                    fullname
                });

                await newUser.save();

                const token = generateToken(newUser);
                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
                res.status(201).send("User created successfully.");
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Email or password incorrect.");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = generateToken(user);
            res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
            res.redirect("/shop");
        } else {
            res.status(400).send("Email or password incorrect.");
        }
    });
};

const logout = (req,res)=>{
    res.cookie("token",token);
    res.redirect("/");
};

export { registerUser, loginUser,logout };
