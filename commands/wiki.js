const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search Wikipedia')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('The searh keyword.')
                .setRequired(true)
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search');
        const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchQuery + '&limit=1&format=json';
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                let wikiItem = 'TITLE: ' + body[1] + '\n';
                wikiItem += 'DESCRIPTION: ' + body[2] + '\n';
                wikiItem += 'URL: ' + body[3];
                message.channel.send(body[3]);
            });
        });
    },
};