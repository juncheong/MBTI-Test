const db = require("../util/db_" + process.env.NODE_ENV);

module.exports = class QuestionResponse {
  constructor(id, responseId, questionId, value) {
    this.id = id;
    this.responseId = responseId;
    this.questionId = questionId;
    this.value = value;
  }
  save() {
    return db.execute(
      "INSERT INTO `question_response` (response_id, question_id, value) VALUES (?, ?, ?)",
      [this.responseId, this.questionId, this.value]
    );
  }
  static deleteAll() {
    return db.execute("DELETE FROM `question_response`");
  }
};
