
Drop DATABASE qanda;

CREATE DATABASE qanda;

\c qanda;

-- questions
CREATE TABLE questions (question_id SERIAL PRIMARY KEY, product_id INT,
	question_body VARCHAR(120), date_written BIGINT, asker_name VARCHAR(30),
	asker_email VARCHAR(40), reported BOOLEAN DEFAULT FALSE, question_helpfulness INT DEFAULT 0);

COPY questions FROM '/Users/zhangfan/Dropbox/HackReactor/SDC/SDCdata/questions.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions ADD question_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
UPDATE questions SET question_date = TO_TIMESTAMP(FLOOR(date_written/1000));
ALTER TABLE questions DROP COLUMN date_written;
CREATE INDEX product_id ON answers (product_id);

-- ALTER TABLE questions DROP COLUMN asker_email;

-- answers
CREATE TABLE answers (answer_id SERIAL PRIMARY KEY, question_id BIGINT,
  body VARCHAR(120), date_written BIGINT, answerer_name VARCHAR(30),answerer_email VARCHAR(40), reported BOOLEAN DEFAULT FALSE, helpfulness INT DEFAULT 0);

COPY answers FROM '/Users/zhangfan/Dropbox/HackReactor/SDC/SDCdata/answers.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE answers ADD date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
UPDATE answers SET date = TO_TIMESTAMP(FLOOR(date_written/1000));
ALTER TABLE answers DROP COLUMN date_written;
CREATE INDEX question_id ON answers (question_id);
-- answers_photos
CREATE TABLE answers_photos (photo_id SERIAL PRIMARY KEY, answer_id BIGINT,
  url VARCHAR(140));

COPY answers_photos FROM '/Users/zhangfan/Dropbox/HackReactor/SDC/SDCdata/answers_photos.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX answer_id ON answers_photos (answer_id);
