const db = require("../util/db_" + process.env.NODE_ENV);

module.exports = class Response {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }
  save() {
    return db.execute("INSERT INTO `response` (email) VALUES (?)", [
      this.email
    ]);
  }
  static deleteAll() {
    return db.execute("DELETE FROM `response`");
  }
  static findIdByEmail(email) {
    return db.execute("SELECT response_id FROM `response` WHERE `email` = ?", [
      email
    ]);
  }
};
