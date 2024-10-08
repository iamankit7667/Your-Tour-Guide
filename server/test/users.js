var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("POST /login", () => {
  it("should return a token for valid username and password", (done) => {
    const credentials = {
      username: "rahul",
      password: "123456",
    };
    request(app)
      .post("/users/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
