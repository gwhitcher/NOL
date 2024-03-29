const mysql = require('mysql');
const { mysqlConnect, mysqlClose } = require('../assets/mysql');

function messageCount(message) {
    let connection = mysqlConnect();
    let messageCount = '';
    let messageID = '';
    const author = message.author.username;
    connection.query('SELECT * FROM message_count WHERE author = "' + author + '"', function (error, results, fields) {
        if (results.length === undefined || results.length === 0) {
            const insertSql = 'INSERT INTO message_count (author, message_count) VALUES (\'' + author + '\', \'1\')';
            connection.query(insertSql, function (errorInsert, resultsInsert) {
                if (errorInsert) throw errorInsert;
            });
        } else {
            messageCount = results[0].message_count + 1;
            messageID = results[0].id;
            const updateSql = 'UPDATE message_count SET message_count = \'' + messageCount + '\' WHERE id = \'' + messageID + '\'';
            connection.query(updateSql, function (errorUpdate, resultsUpdate) {
                if (errorUpdate) throw errorUpdate;
            });
        }
        mysqlClose(connection);
    });
}

function log(message) {
    let connection = mysqlConnect();
    const channel = message.channel.id;
    const messageContent = encodeURI(message.content);
    const author = message.author.username;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    const insertSql = 'INSERT INTO log (author, channel, message, created_at) VALUES (?,?,?,?)';
    const values = [author, channel, messageContent, dateTime]
    connection.query(insertSql, values, function (errorInsert, resultsInsert) {
        if (errorInsert) throw errorInsert;
        mysqlClose(connection);
    });
}

module.exports = { messageCount, log }