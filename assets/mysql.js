const mysql = require('mysql');
const { mysqlSettings } = require('../config.json');

function mysqlConnect() {
    return connection = mysql.createConnection({
        host: mysqlSettings.host,
        user: mysqlSettings.user,
        password: mysqlSettings.password,
        database: mysqlSettings.database,
    });
}

function mysqlClose(connection) {
    return connection.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
    });
}

module.exports = { mysqlConnect, mysqlClose }