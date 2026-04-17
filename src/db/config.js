const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "dialect": "postgres"
  },
}