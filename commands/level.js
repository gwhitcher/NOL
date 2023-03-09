const { SlashCommandBuilder } = require('@discordjs/builders');
const { mysqlConnect, mysqlClose } = require('../assets/mysql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Your level based on the amount of your messages.'),
    execute(message) {
        // create mysql connection
        let connection = mysqlConnect();

        //level array
        const int = 201;
        const levels = [];
        for (let i = 1; i < int; i++) {
            const constant = 5 * i;
            const level = constant * i;
            levels.push(level);
        }

        // get message count for user
        const author = message.user.tag;
        const sql = 'SELECT * FROM message_count WHERE author = "' + author + '"';
        connection.query(sql, function (error, results) {
            if (error) throw error;
            let message_count = results[0].message_count;
            const closest = levels.reduce(function (prev, curr) {
                return (Math.abs(curr - message_count) < Math.abs(prev - message_count) ? curr : prev);
            });
            message.reply(author + ' | Level ' + levels.indexOf(closest) + ' | ' + message_count + ' Messages');
        });

        //close the mysql connection
        mysqlClose(connection);
    },
};