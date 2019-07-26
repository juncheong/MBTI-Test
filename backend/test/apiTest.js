process.env.NODE_ENV = "test";
const db = require("../util/db_" + process.env.NODE_ENV);

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const QuestionResponse = require("../models/questionResponse");
const Response = require("../models/response");

chai.use(chaiHttp);

const URL = "http://localhost:5000";

describe("apiController", () => {
  beforeEach(() => {
    return QuestionResponse.deleteAll().then(() => {
      return Response.deleteAll();
    });
  });
  describe("GET /api/questions", () => {
    it("should GET all questions", done => {
      chai
        .request(URL)
        .get("/api/questions")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.gt(0);
          done();
        });
    });
  });

  describe("POST /api/response && GET /api/results", () => {
    it("should POST all responses and GET the results", done => {
      const testData = {
        email: "POST@test.com",
        questionResponses: [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3]
      };
      const testNumQuestions = testData.questionResponses.length - 1;
      let responseId;
      chai
        .request(URL)
        .post("/api/response")
        .set("content-type", "application/json")
        .send(testData)
        .then(res => {
          res.should.have.status(201);
          res.body.responseId.should.be.a("number");

          responseId = res.body.responseId;
        })
        .then(() => {
          chai
            .request(URL)
            .get("/api/result/" + responseId)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              res.body.length.should.be.eql(testNumQuestions);
              for (let i = 1; i <= testNumQuestions; i++) {
                testData.questionResponses[i].should.be.eql(
                  res.body[i - 1].value
                );
              }
              done();
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  after(() => db.end());
});
