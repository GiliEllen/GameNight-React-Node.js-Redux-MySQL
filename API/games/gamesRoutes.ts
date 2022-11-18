import express from "express";
import { findGameByUser, findGameByName, addGame } from "./gamesCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/find-game-by-user", findGameByUser)
.post("/find-game-by-name", findGameByName)
.post("/Add-New-Game", addGame)

export default router;
