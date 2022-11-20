import express from "express";
import db from "../../DB/database";

const cookieParser = require("cookie-parser");

export async function addEvent(req: express.Request, res: express.Response) {
  try {
    const {
      eventDateDay,
      eventDateMonth,
      eventDateYear,
      eventTime,
      eventLocationCity,
      eventLocationAddress,
      eventSpots,
      SelectedGameId,
      userId,
    } = req.body;

    if(!eventDateDay || !eventDateMonth || !eventDateYear) throw new Error("No date data from client on addEvent");
    if(!eventTime || !eventLocationCity || !eventLocationAddress) throw new Error("no event time or location data from client on addEvent")
    if(!eventSpots || !SelectedGameId || !userId) throw new Error("no game or user information from client on addEvent")

    let fullMonth = ""
    if(eventDateMonth >= 10) {
      fullMonth = `${eventDateMonth}`
    } else {
      fullMonth = `0${eventDateMonth}`
    }
    const fullDate = `${eventDateYear}-${fullMonth}-${eventDateDay}`;

    const query = `INSERT INTO gamenight.game_events (date, time, spots_available, game_id, user_host_id, location_city, location_address) VALUES ('${fullDate}', '${eventTime}', ${eventSpots}, ${SelectedGameId}, ${userId}, '${eventLocationCity}', '${eventLocationAddress}');`
  
    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({results})
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error });
  }
}
