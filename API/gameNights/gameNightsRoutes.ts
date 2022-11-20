import express from "express";
import { addEvent } from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/add-event", addEvent)


export default router;
