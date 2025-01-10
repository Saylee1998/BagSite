
import { Router } from "express";
const router = Router();


router.get("/", (req, res) => {
    const error = req.session ? req.session.error : null;
    res.render("index", { error });
});




export default router;