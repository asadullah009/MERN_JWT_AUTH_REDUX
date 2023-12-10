const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    `mongodb://asad:asad@ac-hh92axn-shard-00-00.gnsjmm2.mongodb.net:27017,ac-hh92axn-shard-00-01.gnsjmm2.mongodb.net:27017,ac-hh92axn-shard-00-02.gnsjmm2.mongodb.net:27017/?ssl=true&replicaSet=atlas-7so762-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
