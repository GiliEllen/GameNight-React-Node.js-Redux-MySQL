import express from "express";
import { register } from "./usersCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/register", register)

export default router;
