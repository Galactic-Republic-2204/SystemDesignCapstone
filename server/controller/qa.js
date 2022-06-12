var models = require('../model');

module.exports = {
  getQuestions: function (req, res) {
    const {id:productid, count, page} = req.query;
    models.qa.getQuestions(productid, count, page, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },
  postQuestions: function (req, res) {
    const values = req.body;
    const newQ = {
      body: values.question,
      email: values.email,
      name: values.name,
      product_id: values.product_id
    }
    models.qa.postQuestions(newQ, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  postAnswers: function (req, res) {
    const { question_id } = req.params;
    const answer = req.body;
    models.qa.postAnswers( answer, question_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  helpfulQuestions: function (req, res) {
    console.log('here');
    const {question_id} = req.params;
    console.log('helpful', req.params);

    models.qa.helpfulQuestions(question_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  reportQuestions: function (req, res) {
    const {question_id} = req.params;
    models.qa.reportQuestions(question_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  helpfulAnswers: function (req, res) {
    const {answer_id} = req.params;
    models.qa.helpfulAnswers(answer_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  reportAnswers: function (req, res) {
    const {answer_id} = req.params;
    models.qa.reportAnswers(answer_id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  getAnswers: function (req, res) {
    const {question_id} = req.params;
    const count = req.query.count? req.query.count : 5;
    const page = req.query.page? Number(req.query.page): 0;
    models.qa.getAnswers(question_id, count, page,  (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  }

};