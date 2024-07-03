const request = require("supertest");
const app = require("../index");
const fdb = require("../schemas/feedback");
const { assert } = require("chai");

describe("GET /index/fd", () => {
  it("should return all feedbacks", (done) => {
    request(app)
      .get("/index/fd")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        assert(Array.isArray(res.body));
        done();
      })
      .catch((err) => done(err));
  });
});
