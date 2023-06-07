const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 30,
    queueLimit: 0
});

module.exports = pool;
