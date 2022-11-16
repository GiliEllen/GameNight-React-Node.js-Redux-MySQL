import express from "express";
import { register, login} from "./usersCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)

export default router;
