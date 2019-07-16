const db = require("../util/db_" + process.env.NODE_ENV);

module.exports = class Result {
  constructor(id, email, num, value) {
    this.responseId = id;
    this.email = email;
    this.num = num;
    this.value = value;
  }
  static findById(id) {
    return db.execute(
      "SELECT `num`, `value` " +
        "FROM `response`, `question_response`, `question` " +
        "WHERE response.response_id = ? " +
        "AND response.response_id = question_response.response_id " +
        "AND question_response.question_id = question.question_id " +
        "ORDER BY `num` ASC",
      [id]
    );
  }
};
