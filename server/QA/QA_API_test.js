var chakram = require('chakram'),
  expect = chakram.expect;

var question_id = 3518963;
var product_id = 1;

describe('TEST GET ANSWERS REQUEST', function () {
  var GetAnswersResponse;
  before(function() {
    GetAnswersResponse = chakram.get(
      `http://localhost:3000/qa/questions/${question_id}/answers`
    );
    return GetAnswersResponse;
  });

  it("should return 200 on success", function() {
    return expect(GetAnswersResponse).to.have.status(200);
  });

  it("should return content type", function () {
    return expect(GetAnswersResponse).to.have.header("content-type", 'application/json; charset=utf-8');
  });

  it("should return the answers of the specific question", function () {
    return GetAnswersResponse.then(function(data){
      let id = data.body.question_id;
      return expect(id).to.equal(`${question_id}`)});
  })

});

describe('TEST GET QUESTIONS REQUEST', function () {
  var GetQuestionsResponse;
  before(function() {
    GetQuestionsResponse = chakram.get(
      `http://localhost:3000/qa/questions/?id=${product_id}`
    );
    return GetQuestionsResponse;
  });

  it("should return 200 on success", function() {
    return expect(GetQuestionsResponse).to.have.status(200);
  });

  it("should return content type", function () {
    expect(GetQuestionsResponse).to.have.header("content-type", 'application/json; charset=utf-8');
    return chakram.wait();
  });

  it("should return the answers of the specific question", function () {
    return GetQuestionsResponse.then(function(data){
      let id = data.body.product_id;
      expect(id).to.equal(`${product_id}`)});
  })
})
