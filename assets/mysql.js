const mysql = require('mysql2/promise');
const { mysqlSettings } = require('../config.json');

const pool = mysql.createPool({
    host: mysqlSettings.host,
    user: mysqlSettings.user,
    password: mysqlSettings.password,
    database: mysqlSettings.database,
    waitForConnections: true,
    connectionLimit: mysqlSettings.connectionLimit || 10,
    queueLimit: 0
});

async function query(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

async function close() {
    await pool.end();
}

module.exports = { pool, query, close }
