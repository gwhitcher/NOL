const { SlashCommandBuilder } = require('@discordjs/builders');
const { mysqlConnect, mysqlClose } = require('../assets/mysql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Get the top users.')
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('The number of users.')
                .setRequired(true)
        ),
    async execute(message) {

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

        const number = message.options.getNumber('number') ?? 1;
        const sql = 'SELECT * FROM message_count ORDER BY message_count DESC LIMIT ' + number;
        connection.query(sql, function (error, results) {
            if (error) throw error;
            let topUsers = '';
            for (let i = 0; i < results.length; i++) {
                let closest = levels.reduce(function (prev, curr) {
                    return (Math.abs(curr - results[i].message_count) < Math.abs(prev - results[i].message_count) ? curr : prev);
                });
                topUsers += results[i].author + ' | Level ' + levels.indexOf(closest) + ' | ' + results[i].message_count + ' Messages \n';
            }
            message.reply(topUsers);
        });

        //close the mysql connection
        mysqlClose(connection);
    },
};