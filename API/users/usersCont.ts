import express from "express";
import db from "../../DB/database";

const cookieParser = require('cookie-parser')

export async function register(req: express.Request, res: express.Response) {
    try {
        const { firstName, lastName, email, password, rePassword } = req.body;
        if(!firstName || !lastName || !email || !password || !rePassword) throw new Error("missing data from client on register");

        const query = `INSERT INTO gamenight.users (email, first_name, last_name, password) VALUES ('${email}', '${firstName}', '${lastName}', '${password}')`
        db.query(query, (err, results, fields) => {
            try {
              console.log(err)
                if (err) throw err
                const cookie = results[0].user_id;
                res.cookie("userId", cookie)
                res.send({ ok: true, message: results });
              } catch (error) {
                console.log(err);
                res.status(500).send({ ok: false, error: err });
              }
        })

    } catch (error) {
        res.status(500).send({notOK:error})
    }
}

export async function login(req: express.Request, res:express.Response) {
    try {
        const {email, password} = req.body;
    if(!email || !password) throw new Error("no data from client login in login")
        const query = `SELECT * from users WHERE email='${email}' AND password ='${password}' LIMIT 1`
        db.query(query, (err, results, fields) => {
            try {
                if (err) throw err
                const cookie = results[0].user_id;
                res.cookie("userId", cookie)
                res.send({ ok: true, userArray: results });
              } catch (error) {
                console.log(err);
                res.status(500).send({ ok: false, error: err });
              }
        })
    } catch (error) {
        res.status(500).send({notOK:error})
    }
}

export const getUserByCookie = async (req, res) => {
    try {
      const { userId } = req.cookies;
      if(!userId) throw new Error("no userId found")
      if(userId === undefined) throw new Error("no user")

      const query = `SELECT * from users WHERE user_id='${userId}' LIMIT 1`
        db.query(query, (err, results, fields) => {
            try {
                if (err) throw err
                res.send({ user: results[0] });
              } catch (error) {
                console.log(err);
                res.status(500).send({ ok: false, error: err });
              }
        })
    } catch (error) {
      console.error(error)
    }
  }