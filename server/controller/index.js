const axios = require('axios');
require('dotenv').config();
const model = require('./../model')


module.exports = {
  getQuestions: async (req, res)=> {
    try{

      var productID = req.query.product_id

      // var page = req.query.page ? req.query.page : 1 ;
      // var count = req.query.count ? req.query.count : 5;
      var dbResponse = await model.getQuestionsDB(productID, page, count)
      res.json(dbResponse.results)
    } catch (err) {
      console.log('controller err', err)
    }
  },
  getAnswers: async (req, res)=> {
    try{
      // console.log(req.query)
      // console.log('param', req.params)
      var questionID = req.params.question_id
      // console.log(productID)
      var page = req.query.page ? req.query.page : 1 ;
      var count = req.query.count ? req.query.count : 5;
      var dbResponse = await model.getAnswersDB(questionID, page, count)
      // console.log('dbResponse', dbResponse)
      res.json(dbResponse.results)
    } catch (err) {
      console.log('controller err', err)
    }
  },
  postQuestions: async(req, res)=> {
    try{
      // console.log(req.query)
      // console.log('param', req.params)
      // console.log(req.body)
      var productID = req.body.product_id
      var body = req.body.body
      var name = req.body.name
      var email = req.body.email
      // console.log(productID)

      var dbResponse = await model.postQuestionDB(productID, body, name, email)
      // console.log('dbResponse', dbResponse)
      if (dbResponse>0) {
        res.status(201).json('Created')
      } else {
        res.json(dbResponse)
      }
    } catch (err) {
      console.log('controller err', err)
      res.json(err)
    }
  },
  postAnswers: async(req, res)=> {
    try{
      // console.log(req.query)
      // console.log('param', req.params)
      var questionID = req.params.question_id
      // console.log(productID)
      var body = req.body.body
      var name = req.body.name
      var email = req.body.email
      var photos = req.body.photos ? req.body.photos : null
      var dbResponseQ = await model.postAnswerDB(questionID, body, name, email, photos)
      // console.log('dbResponse', dbResponse)
      if (dbResponseQ>0) {
        // console.log('here')
        res.status(201).json('Created')
      } else {
        res.json(dbResponse)
      }
    } catch (err) {
      console.log('controller err', err)
      res.json(err)
    }
  },
}
