var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("GET /places/:id", () => {
    it("should return a place object with particular Category", function (done) {
      const placeid = "al";
      request(app)
        .get("/places/places/" + placeid)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => done(err));
    });
  });