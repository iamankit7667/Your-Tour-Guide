var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("GET /pay/:id", () => {
  it("should return a booking by bookid", (done) => {
    const paymentId = "16826127037375";
    request(app)
      .get("/payment/pay/" + paymentId)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
