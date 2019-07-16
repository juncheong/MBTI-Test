const Question = require("../models/question");
const QuestionResponse = require("../models/questionResponse");
const Response = require("../models/response");
const Result = require("../models/result");

exports.getQuestions = (req, res) => {
  Question.fetchAll()
    .then(response => {
      const responseArr = response[0];
      responseArr.forEach(question => {
        question.direction = parseInt(
          Buffer.from(question.direction, "binary").toString()
        );
      });
      res.send(responseArr);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postResponse = (req, res) => {
  const email = req.body.email;
  const questionResponses = req.body.questionResponses;
  const response = new Response(null, email);
  let responseId;

  response
    .save()
    .then(dbResponse => {
      responseId = dbResponse[0].insertId;
      let numInserted = 0;
      for (let i = 1; i < questionResponses.length; i++) {
        Question.getIdByNum(i)
          .then(questionIdResp => {
            const questionIdArr = questionIdResp[0];
            const questionId = questionIdArr[0].question_id;
            const questionResponse = new QuestionResponse(
              null,
              responseId,
              questionId,
              questionResponses[i]
            );
            questionResponse.save().then((numInserted += 1));
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .then(() => {
      setTimeout(() => {
        res.status(201).send({ responseId: responseId });
      }, 80);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send();
    });
};

exports.getResult = (req, res) => {
  const responseId = req.params.responseId;
  Result.findById(responseId)
    .then(results => {
      res.send(results[0]);
    })
    .catch(err => {
      console.log(err);
    });
};
