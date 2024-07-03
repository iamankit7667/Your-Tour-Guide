var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("GET /book/:id", () => {
  it("should return a place object for a valid place ID", function (done) {
    const placeid = "1682193883787";
    request(app)
      .get("/book/book/" + placeid)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
