import express from "express";
import db from "../../DB/database";

const cookieParser = require('cookie-parser')

export async function findGameByUser(req: express.Request, res:express.Response) {
  try {
    
    const {loggedInUser} = req.body;

    const userId = loggedInUser.user_id;
   
    const query = `SELECT g.game_name, g.game_img 
    FROM games as g 
    JOIN users_games as ug ON g.game_id = ug.game_id 
    JOIN users as u ON u.user_id = ug.user_owner_id
    WHERE u.user_id = "${userId}";`

    db.query(query, (err, results, fields) => {
      try {
          if (err) throw err
          res.send({ results });
        } catch (error) {
          console.log(err);
          res.status(500).send({ ok: false, error: err });
        }
  })
  } catch (error) {
    res.status(500).send({error:error})
  }
}

