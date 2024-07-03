var assert = require("assert");
const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("GET /", function () {
  it('should return "Hello World!"', function (done) {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Hello World!");
        done();
      });
  });
});

describe("Feedbacks should return in the form of JSON", function () {
  it("should return a JSON array of feedbacks", function (done) {
    request(app)
      .get("/admins/feedbacks")
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        assert(Array.isArray(res.body));
        done();
      });
  });
});

describe("GET /users", function () {
  it("should return users of given role", function (done) {
    const role = "admin"; // sample role for testing
    request(app)
      .get("/admins/users?role=" + role)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert(res.body.length > 0); // check if response contains data
        assert(res.body[0].role === role); // check if role matches
        done();
      });
  });
});

describe("DELETE /delete/:id", function () {
  it("should delete user of given username", function (done) {
    const username = "nikhil"; // sample username for testing
    request(app)
      .delete("/admins/delete/" + username)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert(res.body.msg === "user deleted " + username); // check if response contains data
        done();
      });
  });
});
