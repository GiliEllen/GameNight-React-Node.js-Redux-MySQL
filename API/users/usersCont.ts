import express from "express";
import db from "../../DB/database";
import { UserJoi } from "./usersModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

const cookieParser = require("cookie-parser");
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { firstName, lastName, email, password, rePassword } = req.body;
    if (!firstName || !lastName || !email || !password || !rePassword)
      throw new Error("missing data from client on register");

    const { error } = UserJoi.validate({
      firstName,
      lastName,
      email,
      password,
      rePassword,
    });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ('${email}', '${firstName}', '${lastName}', '${hashPassword}')`;
    db.query(query, (error, results, fields) => {
      try {
        if (error) throw error;

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Coudln't load secret from .env");   
        const cookie = { userID: results.insertId };
        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userId", JWTCookie);
        res.send({ ok: true, message: results });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ notOK: error });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("no data from client login in login");
    const query = `SELECT * from users WHERE email='${email}'`;
    db.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) throw new Error("Email or password incorrect");

        const cookie = { userID: results[0].user_id };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");

        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userId", JWTCookie);
        res.send({ ok: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: err });
      }
    });
  } catch (error) {
    res.status(500).send({ notOK: error });
  }
}

export const getUserByCookie = async (req, res) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userId } = req.cookies;
    if (!userId) throw new Error("no userId found");
    if (userId === undefined) throw new Error("no user");

    const decodedUserId = jwt.decode(userId, secret);
            const { userID } = decodedUserId;

            const sql = `SELECT * FROM users WHERE user_id = '${userID}'`;
            db.query(sql, (error, results) => {
                if (error) throw error;
                res.send({ user: results[0] });
            });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
