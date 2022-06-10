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
  },

  readReviews: (product_id, callback) => {
    console.log('PRODUCT_ID:', product_id);
    const queryReview = `
      SELECT
        id AS review_id,
        rating,
        summary,
        recommend,
        (CASE WHEN response = 'null' THEN NULL ELSE response END) AS response,
        body,
        date,
        reviewer_name,
        helpfulness,
        COALESCE((SELECT
          json_agg(json_build_object('id', reviewphotos.id, 'url', reviewphotos.url))
            FROM reviewphotos
            WHERE tempreviews.id = reviewphotos.review_id
            ), '[]'::json) AS photos
      FROM tempreviews
      WHERE product_id = ${product_id} AND reported = false
    `;
    db.reviews.query(queryReview, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    });
  }
}


