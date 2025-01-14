import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first!");
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await User.findById(decoded.id);  // Use decoded.id to get the user
        req.user = user;
        next();
    } catch (err) {
        req.flash("error", "Something went wrong. Please login again.");
        res.redirect("/login");
    }
};
