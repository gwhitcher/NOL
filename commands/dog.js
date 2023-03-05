const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Random dog picture.'),
    async execute(message) {

        const url = 'https://random.dog/woof.json';
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                const dogItem = body.url + '\n';
                message.reply(dogItem);
            });
        });

    },
};