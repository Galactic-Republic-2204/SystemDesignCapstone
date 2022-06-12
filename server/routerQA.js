var controller= require('./controller');
var routerQA = require('express').Router();

routerQA.get('/questions', controller.qa.getQuestions);

routerQA.post('/questions', controller.qa.postQuestions);

routerQA.post('/questions/:question_id/answers', controller.qa.postAnswers);

routerQA.put('/questions/:question_id/helpful', controller.qa.helpfulQuestions);

routerQA.put('/questions/:question_id/report', controller.qa.reportQuestions);

routerQA.put('/answers/:answer_id/helpful', controller.qa.helpfulAnswers);

routerQA.put('/answers/:answer_id/report', controller.qa.reportAnswers);

routerQA.get('/questions/:question_id/answers', controller.qa.getAnswers);

module.exports = routerQA;

