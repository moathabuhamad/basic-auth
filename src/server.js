"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./auth/router.js");


app.use(express.json());
app.use(cors());
app.use(router);


function start(port) {
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
}

app.get("/", (req, res) => {
  res.send("server is on");
});


module.exports = {
  app: app,
  start: start,
};