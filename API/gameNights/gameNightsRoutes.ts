import express from "express";
import { addEvent, getUserEvents, getAllEvents, addUserToGameNight } from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
.get("/get-all-events", getAllEvents)
.post("/add-event", addEvent)
.post("/get-user-events", getUserEvents)
.post("/add-user-to-game-night", addUserToGameNight)


export default router;
