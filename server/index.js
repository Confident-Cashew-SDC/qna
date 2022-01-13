const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname +'/db/.env' })
const controller = require('./controller');
const morgan = require('morgan')

// console.log(process.env)
//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.set('port', process.env.PORT)


//api calls
app.get('/qa/questions', controller.getQuestions)
app.get('/qa/questions/:question_id/answers', controller.getAnswers)
app.post('/qa/questions', controller.postQuestions)
app.post('/qa/questions/:question_id/answers', controller.postAnswers)
//can include markquestionashelpful, reportquestion, markanswerashelpful apis
// console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
  console.log(`QnA server listening at at http://localhost:${process.env.PORT}`)
})

// module.exports.app = app