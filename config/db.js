const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ifspace',
    waitForConnections: true,
    connectionLimit: 30,
    queueLimit: 0
});

module.exports = pool;
