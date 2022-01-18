const db = require('./../db');

module.exports = {
  getQuestionsDB: async (product_id, page, count) => {
    try{
      var total = page*count
    // var client = await db.client()
    // await client.query()
    // client.release()
    // console.log(product_id)
      var text = `SELECT json_build_object(
        'product_id', product_id,
        'results', json_agg(
          json_build_object(
            'question_id', questions.id,
            'question_body', questions.body,
            'question_date', questions.date_written,
            'asker_name', questions.asker_name,
            'question_helpfulness', questions.helpful,
            'reported', questions.reported,
            'answers', (SELECT coalesce(answers, '{}'::json)
            FROM (
				SELECT json_object_agg(
              answers.id, json_build_object(
                'id', answers.id,
                'body', answers.body,
                'date', answers.date_written,
                'answerer_name', answers.answerer_name,
                'helpfulness', answers.helpful,
                'photos', (SELECT coalesce(photos, '[]'::json)
                FROM (SELECT json_agg(
                  json_build_object(
                    'id', photos.id,
                    'url', photos.url
                  )
                ) AS photos FROM photos WHERE photos.answers_id = answers.id ) AS photosArr
						)
              		)
				) AS answers FROM answers WHERE answers.questions_id = questions.id
            ) AS answersObj
            )
          )

        )
      ) as results FROM (SELECT * FROM questions WHERE questions.product_id = ${product_id} ORDER BY questions.date_written DESC LIMIT ${total}) AS questions GROUP BY questions.product_id;
      `
      var query = await db.query(text)
      return query.rows[0]
      // console.log('query', query)
      console.log('query.rows', query.rows)
    } catch (err) {
      console.log('db err:', err)
      return err
    }
  },
  getAnswersDB: async (questions_id, page, count) => {
    try{
    // var client = await db.client()
    // await client.query()
    // client.release()
      var total = page*count
    // console.log(product_id)
      var text = `SELECT json_build_object(
        'question', ${questions_id},
        'page', ${page},
        'count', ${count},
        'results', (SELECT coalesce(answers, '[]'::json)
        FROM (
    SELECT json_agg(
         json_build_object(
            'answer_id', answers.id,
            'body', answers.body,
            'date', answers.date_written,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.helpful,
            'photos', (SELECT coalesce(photos, '[]'::json)
            FROM (SELECT json_agg(
              json_build_object(
                'id', photos.id,
                'url', photos.url
              )
            ) AS photos FROM photos WHERE photos.answers_id = answers.id) AS photosArr
        )
              )
    ) AS answers FROM (SELECT * FROM answers WHERE answers.questions_id = ${questions_id} ORDER BY answers.date_written DESC LIMIT ${total}) AS answers
        ) AS answersObj
        )
      ) AS results;`
      var query = await db.query(text)
      console.log('query', query)
      console.log('query.rows', query.rows)
      return query.rows[0]
    } catch (err) {
      console.log('db err:', err)
      return err
    }
  },
  postQuestionDB: async (product_id, body, name, email) => {
    try {
      var text = `INSERT INTO questions (product_id, body, asker_name, asker_email, date_written) VALUES (${product_id}, '${body}', '${name}', '${email}', NOW());`
      var query = await db.query(text)
      return query.rowCount
    } catch (err) {
      console.log('db err:', err)
      return err
    }
  },
  postAnswerDB: async (question_id, body, name, email, photos) => {
    try {
      if (photos) {
        var text = `WITH t AS (
          INSERT INTO public.answers(body, date_written, answerer_name, answerer_email, questions_id)
          VALUES ('${body}', NOW(), '${name}', '${email}', '${question_id}')
          RETURNING id AS answer_id
        ) INSERT INTO photos (answers_id, url) SELECT answer_id, x FROM t, unnest(ARRAY${photos}) x
        ;`
      } else {
        var text =`INSERT INTO public.answers(body, date_written, answerer_name, answerer_email, questions_id)
        VALUES ('${body}', NOW(), '${name}', '${email}', '${question_id}');`
      }
      var query = await db.query(text)
      // console.log('query', query)
      // console.log('query.rows', query.rows)
      // console.log('query.rowCount', query.rowCount)
      return query.rowCount
    } catch (err) {
      console.log('db err:', err)
      return err
    }
  },
}