require('newrelic');
const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname +'/db/.env' })
const controller = require('./controller');
const morgan = require('morgan')


//middlewares
// app.use(morgan('dev'));
app.use(express.json())
app.set('port', process.env.PORT)
app.use(express.static('public'))

//api calls
app.get('/qa/questions', controller.getQuestions)
app.get('/qa/questions/:question_id/answers', controller.getAnswers)
app.post('/qa/questions', controller.postQuestions)
app.post('/qa/questions/:question_id/answers', controller.postAnswers)

// //for tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`QnA server listening at at http://localhost:${process.env.PORT}`)
  })
}

module.exports.app = app
// module.exports.app = app