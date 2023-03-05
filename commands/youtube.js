const { SlashCommandBuilder } = require('@discordjs/builders');
const { yt_key, youtube_count } = require('../config.json');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Does a YouTube search.')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('The searh keyword.')
                .setRequired(true)
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search');
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + youtube_count + '&q=' + searchQuery + '&key=' + yt_key;
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                if (body.items) {
                    for (let i = 0; i < body.items.length; i++) {
                        let googleItem = body.items[i].snippet.title + '\n';
                        googleItem += body.items[i].snippet.description + '\n';
                        googleItem += 'https://youtube.com/watch?v=' + body.items[i].id.videoId;
                        message.reply(googleItem);
                    }
                }
            });
        });
    },
};