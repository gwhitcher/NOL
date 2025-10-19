const { SlashCommandBuilder } = require('discord.js');
const { query } = require('../assets/mysql');

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

        //level array
        const int = 201;
        const levels = [];
        for (let i = 1; i < int; i++) {
            const constant = 5 * i;
            const level = constant * i;
            levels.push(level);
        }

        const number = message.options.getNumber('number') ?? 1;
        const sql = 'SELECT author, message_count FROM message_count ORDER BY message_count DESC LIMIT ?';
        const results = await query(sql, [number]);
        let topUsers = '';
        for (let i = 0; i < results.length; i++) {
            const closest = levels.reduce(function (prev, curr) {
                return (Math.abs(curr - results[i].message_count) < Math.abs(prev - results[i].message_count) ? curr : prev);
            });
            topUsers += results[i].author + ' | Level ' + levels.indexOf(closest) + ' | ' + results[i].message_count + ' Messages \n';
        }
        await message.reply(topUsers || 'No data.');

    },
};
