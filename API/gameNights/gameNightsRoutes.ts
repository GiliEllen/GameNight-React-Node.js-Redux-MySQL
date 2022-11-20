import express from "express";
import { addEvent, getUserEvents } from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/add-event", addEvent)
.post("/get-user-events", getUserEvents)


export default router;
