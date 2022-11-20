import express from "express";
import { addEvent, getUserEvents, getAllEvents } from "./gameNightsCont";
import db from "../../DB/database";

const router = express.Router();

router
.get("/get-all-events", getAllEvents)
.post("/add-event", addEvent)
.post("/get-user-events", getUserEvents)


export default router;
