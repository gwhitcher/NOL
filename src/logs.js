/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Logs {
    load(message) {
        const { prefix, mysql_host, mysql_user, mysql_pass, mysql_db } = require('../config.json');
        const fs = require('fs');
        const mysql = require('mysql');

        // if bot exit
        if (message.author.bot) return;

        // get author
        const author = message.author.username;
        author.replace("'", "");

        // create mysql connection
        const connection = mysql.createConnection({
            host: mysql_host,
            user: mysql_user,
            password: mysql_pass,
            database: mysql_db,
        });

        // logging
        if (message.content !== '') {
            // make files
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const dateTime = ' [' + date + ' ' + time + '] : ';
            const logMessage = author + dateTime + message.content + '\r\n';
            const channelDir = message.channel.name;
            fs.appendFile('logs/' + channelDir + '/' + date + '.txt', logMessage, (err) => {
                if (err) throw err;
            });
        }

        // store message count
        if (message.content !== '') {
            let messageCount = '';
            let messageID = '';

            connection.query('SELECT * FROM message_count WHERE author = "' + author + '"', function(error, results, fields) {

                if (results.length === undefined || results.length === 0) {
                    const insertSql = 'INSERT INTO message_count (author, message_count) VALUES (\'' + author + '\', \'1\')';
                    connection.query(insertSql, function(errorInsert, resultsInsert) {

                        if (errorInsert) throw errorInsert;

                    });
                } else {
                    messageCount = results[0].message_count + 1;
                    messageID = results[0].id;
                    const updateSql = 'UPDATE message_count SET message_count = \'' + messageCount + '\' WHERE id = \'' + messageID + '\'';
                    connection.query(updateSql, function(errorUpdate, resultsUpdate) {

                        if (errorUpdate) throw errorUpdate;

                    });
                }

                // close connections
                connection.end();

            });
        }
    }
}

module.exports = Logs;