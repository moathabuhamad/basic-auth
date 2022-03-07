"use strict";

const { beforeAll } = require("@jest/globals");
const supertest = require("supertest");
const { db } = require("../src/auth/models/index.js");
const server = require("../src/server.js");
const request = supertest(server.app);

beforeAll(() => {
  db.sync();
});

afterAll(() => {
  db.drop();
});

describe("Testing aunthenication server routes", () => {
  it("testing /signup", async () => {
    const response = await request.post("/signup").send({
      username: "username",
      password: "password",
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual("username");
  });

  it("testing /signin", async () => {
    const response = await request.post(`/signin`).auth("username", "password");
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual("username");
  });
});
