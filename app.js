import express from "express";
const app = express();


import dotenv from "dotenv";



import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




import indexRouter from "./routes/index.js";

import ownersRoutes from "./routes/ownersRoutes.js"

import productsRoutes from "./routes/productsRoutes.js"

import usersRoutes from "./routes/usersRoutes.js"

dotenv.config({ path: './.env' });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);



app.use(cookieParser());

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static(path.join(__dirname, "public")));




app.use("/owners", ownersRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);



export { app }