import express from "express";
import http from "http";
import mysql from "mysql";

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const sqlPassword = process.env.SQLPASSWORD;
const url = process.env.MONGODB_URI;

app.use(express.json());

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

app.use("/check", (req, res) => {
    try {
        console.log("check")
        res.send({ok: "hello"})
    } catch (error) {
        res.status(500).send({error: error})
    }
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

