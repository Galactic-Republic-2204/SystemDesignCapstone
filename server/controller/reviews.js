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
  }
}
