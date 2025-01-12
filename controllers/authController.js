import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const user = await User.findOne({email:email});
        if(user) return res.send("Account already exists!Please login");



        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    const user = await User.create({
                        email,
                        password: hash,
                        fullname
                    });
                    //res.status(201).json({ message: "User registered successfully", user });
                    const token = generateToken(user);
                    res.cookie("token",token);
                    res.send("user created successfully");
                }
            })

        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const loginUser = async(req, res)=>{
    const {email,password}= req.body;
    const user = await User.findOne({email:email});

    if(!user) return res.send("Email or password incorrect");

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token = generateToken(user);
            res.cookie("token",token);
            res.send("u can login");
        } else{
            res.send("Email or password incorrect");
        }
    });
}

export {registerUser,loginUser};