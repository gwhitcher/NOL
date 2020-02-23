/* eslint-disable indent */
class Levels {
    load(message) {
        const { prefix, mysql_host, mysql_user, mysql_pass, mysql_db, top_count } = require('../config.json');
        const mysql = require('mysql');

        // if bot exit
        if (message.author.bot) return;

        // get author
        const author = message.author.username;

        // create mysql connection
        const connection = mysql.createConnection({
            host: mysql_host,
            user: mysql_user,
            password: mysql_pass,
            database: mysql_db,
        });

        const int = 201;
        const levels = [];
        for (let i = 1; i < int; i++) {
            const constant = 5 * i;
            const level = constant * i;
            // console.log('Level ' + i + ' EXP: ' + level);
            levels.push(level);
        }

        if (message.content.startsWith(prefix + 'level')) {
            const sql = 'SELECT * FROM message_count WHERE author = "' + author + '"';
            connection.query(sql, function(error, results) {

                if (error) throw error;

                const message_count = results[0].message_count;
                const closest = levels.reduce(function(prev, curr) {
                    return (Math.abs(curr - message_count) < Math.abs(prev - message_count) ? curr : prev);
                });
                message.reply(author + ' | Level ' + levels.indexOf(closest) + ' | ' + message_count + ' Messages');

                // close connections
                connection.end();

            });

        }

        if (message.content.startsWith(prefix + 'top')) {
            const sql = 'SELECT * FROM message_count ORDER BY message_count DESC LIMIT ' + top_count + '';
            connection.query(sql, function(error, results) {

                if (error) throw error;

                for (let i = 0; i < results.length; i++) {
                    const message_count = results[i].message_count;
                    const closest = levels.reduce(function(prev, curr) {
                        return (Math.abs(curr - message_count) < Math.abs(prev - message_count) ? curr : prev);
                    });
                    const topUser = results[i].author + ' | Level ' + levels.indexOf(closest) + ' | ' + results[i].message_count + ' Messages';
                    message.reply(topUser);
                }

                // close connections
                connection.end();

            });
        }

    }
}

module.exports = Levels;