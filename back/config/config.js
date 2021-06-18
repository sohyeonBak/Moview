const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "moview",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "moview",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "back",
    "password": process.env.DB_PASSWORD,
    "database": "moview",
    "host": "13.125.136.244",
    "dialect": "mysql"
  }
}
