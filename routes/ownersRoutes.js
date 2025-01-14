import { Router } from "express";
const router = Router();

import {Owner} from "../models/owner.models.js";


router.get("/admin",(req,res)=>{
    res.render("createproducts");
})
export default router;