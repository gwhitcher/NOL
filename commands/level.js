const { SlashCommandBuilder } = require('discord.js');
const { query } = require('../assets/mysql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Your level based on the amount of your messages.'),
    async execute(message) {
        //level array
        const int = 201;
        const levels = [];
        for (let i = 1; i < int; i++) {
            const constant = 5 * i;
            const level = constant * i;
            levels.push(level);
        }

        // get message count for user
        const author = message.user.username;
        const authorId = message.user.id;
        const sql = 'SELECT message_count FROM message_count WHERE author_id = ? OR author = ? ORDER BY author_id IS NULL LIMIT 1';
        const results = await query(sql, [authorId, author]);
        const message_count = results?.[0]?.message_count ?? 0;
        const closest = levels.reduce(function (prev, curr) {
            return (Math.abs(curr - message_count) < Math.abs(prev - message_count) ? curr : prev);
        });
        await message.reply(author + ' | Level ' + levels.indexOf(closest) + ' | ' + message_count + ' Messages');
    },
};
