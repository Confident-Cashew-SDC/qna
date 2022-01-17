
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 id BIGSERIAL,
 body TEXT NOT NULL,
 date_written BIGINT NOT NULL,
 asker_name TEXT,
 helpful INTEGER DEFAULT 0,
 reported BOOLEAN DEFAULT 'false',
 asker_email TEXT,
 product_id INTEGER
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


CREATE TABLE answers (
 id BIGSERIAL,
 body TEXT NOT NULL,
 date_written BIGINT NOT NULL,
 answerer_name TEXT,
 helpful INTEGER DEFAULT 0,
 answerer_email TEXT,
 reported BOOLEAN DEFAULT 'false',
 questions_id INTEGER FOREIGN KEY references questions(id)
);
-- might be a good idea to check for if email has @ in it

ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


CREATE TABLE photos (
 id BIGSERIAL,
 url TEXT,
 answers_id INTEGER FOREIGN KEY references answers(id)
);
-- might be a good idea to check for if url has .com or w.e the url should have
ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

-- ALTER TABLE answers ADD CONSTRAINT answers_questions_id_fkey FOREIGN KEY (questions_id) REFERENCES questions(id);
-- ALTER TABLE photos ADD CONSTRAINT photos_answers_id_fkey FOREIGN KEY (answers_id) REFERENCES answers(id);

---index ---
CREATE INDEX questionsProductIdIndex ON questions(product_id);
CREATE INDEX answersQuestionIdIndex ON answers(questions_id);
CREATE INDEX answersPhotosIdIndex ON photos(answers_id);

-- to Run file
-- psql postgres
-- \i documents/week8/schema.sql

-- ETL
-- COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/jlee72/Downloads/questions.csv' DELIMITER ',' CSV HEADER;
-- COPY photos(id, answers_id, url) FROM '/Users/jlee72/Downloads/answers_photos.csv' DELIMITER ',' CSV HEADER;
-- COPY answers(id, questions_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/jlee72/Downloads/answers.csv' DELIMITER ',' CSV HEADER;
-- • alter table questions ALTER COLUMN date_written SET DATA TYPE timestamp with time zone USING to_timestamp(date_written/1000);
-- alter table alter column set default now()???
-- SELECT setval(pg_get_serial_sequence('questions', 'id'), coalesce(max(id), 0)+1 , false) FROM questions;
-- SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id), 0)+1 , false) FROM answers;
-- SELECT setval(pg_get_serial_sequence('questions', 'id'), coalesce(max(id), 0)+1 , false) FROM questions;

-- SELECT * from questions limit 10;
-- for checking amount of questions
-- \dt
-- for checking out table
