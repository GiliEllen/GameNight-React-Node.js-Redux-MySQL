import express from "express";
import { findGameByUser, findGameByName } from "./gamesCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/find-game-by-user", findGameByUser)
.post("/find-game-by-name", findGameByName)

export default router;
