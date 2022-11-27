import express from "express";
import db from "../../DB/database";
import jwt from "jwt-simple";

const cookieParser = require("cookie-parser");

export async function findGameByUser(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { loggedInUser } = req.body;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userId } = req.cookies;
    if (!userId) throw new Error("no userId found");
    if (userId === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userId, secret);
            const { userID } = decodedUserId;

    const query = `SELECT g.game_name, g.game_img, g.game_id 
    FROM games as g 
    JOIN users_games as ug ON g.game_id = ug.game_id 
    JOIN users as u ON u.user_id = ug.user_owner_id
    WHERE u.user_id = "${userID}";`;

    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function findGameByName(
  req: express.Request,
  res: express.Response
) {
  try {
    const { gameName } = req.body;
    if (!gameName) throw new Error("no game from client on findGameByName");

    const query = `SELECT game_name, game_img FROM gamenight.games
    WHERE game_name LIKE "%${gameName}%"`;

    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function addGame(req: express.Request, res: express.Response) {
  try {
    const { gameName, gameImg } = req.body;
    if (!gameName || !gameImg)
      throw new Error("no data from cliend on addGame");
    const query = `INSERT INTO gamenight.games (game_name, game_img) VALUES ('${gameName}', '${gameImg}')`;
    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        console.log(results);
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function addGameToUser(
  req: express.Request,
  res: express.Response
) {
  try {

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");
    const { userId } = req.cookies;
    if (!userId) throw new Error("no userId found");
    if (userId === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userId, secret);
    const { userID } = decodedUserId;
    const { name } = req.body;
    if (!userID || !name)
      throw new Error("no loggedInUser or name from client on addGameToUser");
    const query = `INSERT INTO gamenight.users_games (user_owner_id ,game_id) 
    SELECT "${userID}", game_id FROM gamenight.games
    WHERE game_name = '${name}';`;

    db.query(query, (err, results, fields) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function getAllGames(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");
    const { userId } = req.cookies;
    if (!userId) throw new Error("no userId found");
    if (userId === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userId, secret);
    const { userID } = decodedUserId;
    if (!userId || !userID)
      throw new Error("no loggedInUser from client on get all games");
    const query = `SELECT *
    FROM gamenight.games as g;
    SELECT g.game_name, g.game_img, g.game_id 
    FROM games as g 
    JOIN users_games as ug ON g.game_id = ug.game_id 
    JOIN users as u ON u.user_id = ug.user_owner_id
    WHERE u.user_id = "${userID}";`;

    db.query(query, [1,2], (err, results, fields) => {
      try {
        if (err) throw err;
        const gamesArray = [];
        results[0].map((result) => {
          
          if (results[1].some(e => e.game_id === result.game_id)) {
            console.log("try to push none addble")
            gamesArray.push({
              game_name: result.game_name,
              game_img: result.game_img,
              game_id: result.game_id,
              gameAddble: false,
            });}
           else {
            console.log("try to push addble")
            gamesArray.push({
              game_name: result.game_name,
              game_img: result.game_img,
              game_id: result.game_id,
              gameAddble: true,
            });
          }
        });
        res.send({ gamesArray });
      } catch (error) {
        console.log(err, error);
        res.status(500).send({ ok: false, error: err, error2: error });
      }
    });
  } catch (error) {
    console.log( error);

    res.status(500).send({ error: error });
  }
}
