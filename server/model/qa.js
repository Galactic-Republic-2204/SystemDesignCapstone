const db = require('../db/qa');

module.exports = {
  getQuestions: function (productid, count=5, page = 0, callback) {
    const offset = page * count;
    db.query(`
    select json_agg(
      json_build_object(
        'question_id', q.question_id,
        'question_body', q.question_body,
        'question_date', q.question_date,
        'asker_name', q.asker_name,
        'question_helpfulness', q.question_helpfulness,
        'reported', q.reported,
        'answers', (
          select coalesce(json_object_agg (
            a.answer_id, (
              select json_build_object(
                'id', a.answer_id,
                'body', a.body,
                'date', a.date,
                'answerer_name', a.answerer_name,
                'helpfulness', a.helpfulness,
                'photos', (
                  select coalesce(json_agg(row_to_json(ph)), '[]')
                  from (select photo_id, url from answers_photos p where p.answer_id = a.answer_id) ph)
                )
            )
          ),'[]') from answers a where a.question_id = q.question_id
        )
      )
    ) as results from questions as q where q.reported = false and q.product_id = ${productid}
    limit ${count} offset ${offset}
  ;`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {product_id: productid, results: data.rows});
      }
    })
  },

  postQuestions: function (newQ, callback) {
    const {product_id, name, email, body} = newQ;
    // console.log('postQuestions-input',product_id, name, email, body);
    return db.query(`insert into questions (product_id, asker_name, asker_email, question_body) values (${product_id}, '${name}', '${email}', '${body}')`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  postAnswers: function (answer, question_id, callback) {
    const {name, email, body, photos} = answer;
    const totalcount = photos.length;
    const photos_json = JSON.stringify(photos);
    console.log('postAnswers-input',name, email, body, photos_json);
    db.query(`insert into answers (question_id, body, answerer_name, answerer_email) values (${question_id}, '${body}', '${name}', '${email}')`, (err, ) => {
      if (err) {
        callback(err);
        return;
      } else {
        if (totalcount === 0) {
          callback(null);
        } else {
         db.query(`
          insert into answers_photos (answer_id, url)
          select ph.answer_id, ph.value as url from (select currval(pg_get_serial_sequence('answers', 'answer_id')) as answer_id, * from json_array_elements('${photos_json}')) ph`, (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          })
        }
      }
    })
  },

  helpfulQuestions: function (question_id, callback) {
    db.query(`update questions set question_helpfulness = question_helpfulness + 1 where question_id = ${question_id}`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  reportQuestions: function (question_id, callback) {
    db.query(`update questions set reported = true where question_id = ${question_id}`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  helpfulAnswers: function (answer_id, callback) {
    db.query(`update answers set helpfulness = helpfulness + 1 where answer_id = ${answer_id}`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  reportAnswers: function (answer_id, callback) {
    db.query(`update answers set reported = true where answer_id = ${answer_id}`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  },

  getAnswers: function(question_id, count, page, callback){
    const offset = page*count;
    db.query(`
    SELECT
    answers.answer_id, answers.body, answers.date, answers.answerer_name, answers.helpfulness,
    COALESCE(
      ARRAY_AGG (
        CASE
          WHEN answers_photos.photo_id is not null THEN JSON_BUILD_OBJECT('id', (answers_photos.photo_id), 'url', (answers_photos.url))
        END
      ) FILTER (WHERE answers_photos.photo_id is not null),'{}') AS photos
    FROM
      answers LEFT JOIN answers_photos ON answers.answer_id=answers_photos.answer_id
    WHERE
      answers.question_id = ${question_id}
    GROUP BY
    answers.answer_id
    LIMIT ${count}
    OFFSET ${offset};
`, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {question_id: question_id, page: page, count: count, results:  data.rows});
      }
    })
  }
}
