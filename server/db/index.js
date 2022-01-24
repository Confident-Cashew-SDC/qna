// const { Pool} = require('pg');
const pgp = require('pg-promise')(/* options */);
require('dotenv').config()

// const res = await pool.query('SELECT NOW()')
// await pool.end()
// console.log(process.env.USER)
const connection = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 5432,
  min: 0,
  max: 50,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 200,
}
module.exports.db = pgp(connection);

// const pool = new Pool ({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: 5432,
//   min: 0,
//   max: 50,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 200,
// })

// module.exports = {
//   query: (text, params) => {
//     // const start = Date.now()
//     return pool.query(text, params)
//     // const duration = Date.now() - start
//     // console.log('executed query', { text, duration, rows: res.rowCount })

//   }
// }