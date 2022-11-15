import express from "express";
import db from "../../DB/database";

export async function register(req: express.Request, res: express.Response) {
    try {
        console.log("controller")
        const { firstName, lastName, email, password, rePassword } = req.body;
        if(!firstName || !lastName || !email || !password || !rePassword) throw new Error("missing data from client on register");

        const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ('${email}', '${firstName}', '${lastName}', '${password}')`
        db.query(query, (err, results, fields) => {
            try {
                if (err) throw err
                res.send({ ok: true, message: results });
              } catch (error) {
                console.log(err);
                res.status(500).send({ ok: false });
              }
        })

    } catch (error) {
        res.status(500).send({notOK:error})
    }
}
