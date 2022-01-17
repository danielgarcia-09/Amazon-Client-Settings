require('../config/config');

const SQLite = require('better-sqlite3');
const db = new SQLite(process.env.DB_NAME, { verbose: console.log})

module.exports = db;