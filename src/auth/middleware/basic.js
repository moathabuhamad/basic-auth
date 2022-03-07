"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { Users } = require("../models/index.js");

const bAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    console.log("basicHeaderParts >>> ", basicHeaderParts);
    let encodedPart = basicHeaderParts.pop();
    console.log("encodedPart >>> ", encodedPart);
    let decoded = base64.decode(encodedPart);
    console.log("decoded >>> ", decoded);
    let [username, password] = decoded.split(":");
    try {
      const user = await Users.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json({ username: username });
      } else {
        res.send("user is not valid");
      }
    } catch (error) {
      res.send(error);
    }
  }
};

module.exports = bAuth;
