import { Router } from "express";
import { User } from "../models/user.models.js";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password, fullname } = req.body;
        const user = await User.create({ email, password, fullname });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
