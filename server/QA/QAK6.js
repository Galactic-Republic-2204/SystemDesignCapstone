import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
  vus: 1000, //virtual users
  duration: "30s",
};

export default function () {
  // //1. test get answers
  // http.get(`http://localhost:3000/qa/questions/${Math.floor(Math.random()*100000)}/answers`);

  //2. test get questions
  http.get(`http://localhost:3000/qa/questions/?id=${Math.floor(Math.random()*100000)}`);

  // //3. test post questions
  // let product_id = Math.random()*100000;
  // let post_questions = JSON.stringify({
  //     question: "How old are you",
  //     email: "what@hello.com",
  //     name: "hellokitty",
  //     product_id: product_id
  //   });
  // http.post(`http://localhost:3000/qa/questions`, post_questions, {headers: {'Content-Type': 'application/json' }});
}