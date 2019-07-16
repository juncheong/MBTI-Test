const db = require("../util/db_" + process.env.NODE_ENV);

module.exports = class Question {
  constructor(id, num, text, dimension, direction, meaning) {
    this.id = id;
    this.num = num;
    this.text = text;
    this.dimension = dimension;
    this.direction = direction;
    this.meaning = meaning;
  }
  static fetchAll() {
    return db.execute("SELECT * FROM `question` ORDER BY `num` ASC");
  }
  static getIdByNum(num) {
    return db.execute(
      "SELECT question_id FROM `question` WHERE question.num = ?",
      [num]
    );
  }
};
