const models = require('../model');

module.exports = {
  test: (req, res) => {
    models.reviews.test((err, testResult) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(testResult);
      }
    });
  },

  getReviews: (req, res) => {
    console.log('PARAMS in CONTROLLER', req.params.id);
    models.reviews.readReviews(req.params.id, (err, reviewResults) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(reviewResults);
      }
    });
  }
}
