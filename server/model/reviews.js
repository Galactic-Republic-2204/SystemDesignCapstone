const db = require('../db');

module.exports = {
  test: (callback) => {
    const queryStr = 'SELECT * FROM reviewphotos where id = 1';
    db.reviews.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    });
  }
}

