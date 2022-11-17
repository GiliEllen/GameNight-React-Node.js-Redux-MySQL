import express from "express";
import { findGameByUser } from "./gamesCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/find-game-by-user", findGameByUser);

export default router;
