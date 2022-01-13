const axios = require('axios');
require('dotenv').config();
const model = require('./../model')


module.exports = {
  getQuestions: async (req, res)=> {
    try{
      var dbResponse = await model.getQuestionsDB(req.body)
      console.log('dbResponse', dbResponse)
      res.json(dbResponse)
    } catch (err) {
      console.log('controller err', err)
    }
  },
  getAnswers: ()=> {

  },
  postQuestions: ()=> {

  },
  postAnswers: ()=> {

  },
}
