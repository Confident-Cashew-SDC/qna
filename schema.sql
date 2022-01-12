
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 id BIGSERIAL,
 body TEXT NOT NULL,
 date_written DATE NOT NULL DEFAULT CURRENT_DATE,
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
 date_written DATE NOT NULL DEFAULT CURRENT_DATE,
 answerer_name TEXT,
 helpful INTEGER DEFAULT 0,
 answerer_email TEXT,
 reported BOOLEAN DEFAULT 'false',
 questions_id INTEGER references questions(id)
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


CREATE TABLE photos (
 id BIGSERIAL,
 url TEXT,
 answers_id INTEGER references answers(id)
);

ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

-- ALTER TABLE answers ADD CONSTRAINT answers_questions_id_fkey FOREIGN KEY (questions_id) REFERENCES questions(id);
-- ALTER TABLE photos ADD CONSTRAINT photos_answers_id_fkey FOREIGN KEY (answers_id) REFERENCES answers(id);

---index ---
CREATE INDEX questionsProductIdIndex ON questions(product_id);
CREATE INDEX answersQuestionIdIndex ON answers(questions_id);
CREATE INDEX answersPhotosIdIndex ON photos(answers_id);