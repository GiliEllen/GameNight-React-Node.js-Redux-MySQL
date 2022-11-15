import express from "express";
import http from "http";
import mysql from "mysql";

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const sqlPassword = process.env.SQLPASSWORD;
const url = process.env.MONGODB_URI;

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: sqlPassword,
  database: "movie",
});

connection.connect((err) => {
  try {
    if (err) throw err;

    console.info("🔥 MySQL is connected 🛢 ");
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
