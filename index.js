"use strict";

const server = require("./src/server.js");
const { db } = require("./src/auth/models/index.js");
const dotenv = require("dotenv");

dotenv.config();
db.sync().then(() => {
  server.start(process.env.PORT || 3003);
});
