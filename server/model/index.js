const db = require('./../db');

module.exports = {
  getQuestionsDB: async () => {
    try{
    // var client = await db.client()
    // await client.query()
    // client.release()
      var text = 'SELECT * FROM questions LIMIT 10'
      var query = await db.query(text)
      return query.rows
      // console.log('query', query)
      console.log('query.rows', query.rows)
    } catch (err) {
      console.log('db err:', err)
    }
  }
}