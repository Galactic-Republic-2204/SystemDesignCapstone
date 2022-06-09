const pg = require('pg');

const connection = new pg.Client({
  host: '127.0.0.1',
  user: 'xiaohan',
  password: '',
  database: 'ratingsandreviews'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected!');
  }
});

module.exports = connection;