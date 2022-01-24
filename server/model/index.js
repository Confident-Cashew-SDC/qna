const db = require('./../db').db;

module.exports = {
  getQuestionsDB: (product_id, page, count, callback) => {

      var total = page*count

      // var text = `SELECT json_build_object(
      //   'product_id', ${product_id},
      //   'results', json_agg(
      //     json_build_object(
      //       'question_id', questions.id,
      //       'question_body', questions.body,
      //       'question_date', questions.date_written,
      //       'asker_name', questions.asker_name,
      //       'question_helpfulness', questions.helpful,
      //       'reported', questions.reported,
      //       'answers', (SELECT coalesce(answers, '{}'::json)
      //       FROM (
			// 	SELECT json_object_agg(
      //         answers.id, json_build_object(
      //           'id', answers.id,
      //           'body', answers.body,
      //           'date', answers.date_written,
      //           'answerer_name', answers.answerer_name,
      //           'helpfulness', answers.helpful,
      //           'photos', (SELECT coalesce(photos, '[]'::json)
      //           FROM (SELECT json_agg(
      //             json_build_object(
      //               'id', photos.id,
      //               'url', photos.url
      //             )
      //           ) AS photos FROM photos WHERE photos.answers_id = answers.id ) AS photosArr
			// 			)
      //         		)
			// 	) AS answers FROM answers WHERE answers.questions_id = questions.id
      //       ) AS answersObj
      //       )
      //     )
      //   )
      // ) as results FROM (SELECT * FROM questions WHERE product_id = ${product_id} LIMIT ${total}) AS questions;
      // `
      //took out - ORDER BY questions.date_written DESC (originally went inbetween questions_id and LIMIT)
      /////
      // db.query(`SELECT json_build_object(
      //   'product_id', ${product_id},
      //   'results', json_agg(
      //     json_build_object(
      //       'question_id', questions.id,
      //       'question_body', questions.body,
      //       'question_date', questions.date_written,
      //       'asker_name', questions.asker_name,
      //       'question_helpfulness', questions.helpful,
      //       'reported', questions.reported,
      //       'answers', (SELECT coalesce(answers, '{}'::json)
      //       FROM (
			// 	SELECT json_object_agg(
      //         answers.id, json_build_object(
      //           'id', answers.id,
      //           'body', answers.body,
      //           'date', answers.date_written,
      //           'answerer_name', answers.answerer_name,
      //           'helpfulness', answers.helpful,
      //           'photos', (SELECT coalesce(photos, '[]'::json)
      //           FROM (SELECT json_agg(
      //             json_build_object(
      //               'id', photos.id,
      //               'url', photos.url
      //             )
      //           ) AS photos FROM photos WHERE photos.answers_id = answers.id ) AS photosArr
			// 			)
      //         		)
			// 	) AS answers FROM answers WHERE answers.questions_id = questions.id
      //       ) AS answersObj
      //       )
      //     )
      //   )
      // ) as results FROM (SELECT * FROM questions WHERE product_id = ${product_id} LIMIT ${total}) AS questions;
      // `)
      /////
      db.query(`SELECT json_agg(
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
        ) as results FROM (SELECT * FROM questions WHERE product_id = ${product_id} LIMIT ${total}) AS questions;
      `)
        .then((result)=>{
          var final = {
            product_id: product_id,
            results: result[0].results
          }
          // console.log(result[0].results)
          callback(null, final)
        })
        .catch((err)=>{
          console.log(err)
          callback(err, null)
        })
        // .then((result)=>{
        //   callback(result.rows[0])
        // })
        // .catch((err)=>{
        //   console.log(err)
        //   callback(err)
        // })


  },
  getAnswersDB: async (questions_id, page, count) => {
    try{
    // var client = await db.client()
    // await client.query()
    // client.release()
      var total = page*count
      // console.log(questions_id)
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
    ) AS answers FROM (SELECT * FROM answers WHERE questions_id = ${questions_id} ORDER BY date_written DESC LIMIT ${total}) AS answers
        ) AS answersObj
        )
      ) AS results;`
      //took out - ORDER BY answers.date_written DESC (originally went inbetween questions_id and LIMIT)
      var query = await db.query(text)
      // console.log('query', query)
      // console.log('query.rows', query.rows)
      return query.rows[0]
    } catch (err) {
      console.log('db err:', err)
      return err
    }
  },
  postQuestionDB: (product_id, body, name, email) => {

      var text = `INSERT INTO questions (product_id, body, asker_name, asker_email, date_written) VALUES (${product_id}, '${body}', '${name}', '${email}', NOW());`
      db.query(text)
        .then((result)=>{
          query.rowCount
        })
        .catch((err)=>{
          console.log('db err:', err)
          return err
        })

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