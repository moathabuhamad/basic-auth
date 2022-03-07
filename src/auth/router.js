"use strict";

const express = require("express");
const router = express.Router();
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { Users } = require("./models/index.js");
const bAuth = require("./middleware/basic.js");

router.post("/signup", signup);
async function signup(req, res) {
  let { username, password } = req.body;
  console.log(`${username} and ${password}`);
  try {
    let hashedPassword = await bcrypt.hash(password, 5);
    console.log("after hashing >>> ", hashedPassword);
    const newUser = await Users.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log("signUp function", error);
  }
}

router.post("/signin", bAuth, signin);
async function signin(req, res) {};

module.exports = router ;
