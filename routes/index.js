import { Router } from "express";
import { Product } from "../models/product.models.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = Router();

router.get("/", (req, res) => {
    const error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
    try {
        const products = await Product.find();  
        const error = req.flash("error");
        res.render("shop", { products, error });  
    } catch (err) {
        req.flash("error", "Failed to fetch products");
        res.redirect("/");
    }
});

router.get("/logout",isLoggedIn,(req,res)=>{
    res.render("shop");
});

export default router;
