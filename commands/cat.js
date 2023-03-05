const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Random cat picture.'),
    async execute(message) {

        const url = 'https://aws.random.cat/meow';
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                const catItem = body.file + '\n';
                message.reply(catItem);
            });
        });

    },
};