const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redtube')
        .setDescription('RedTube search (NSFW).')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('Your search query.')
                .setRequired(true)
        ),
    async execute(message) {
        const search = message.options.getString('search') ?? '';
        const url = 'https://api.redtube.com/?data=redtube.Videos.searchVideos&search=' + search + '&thumbsize=all&output=json';
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                for (let i = 0; i < body.videos.length; i++) {
                    if (i === 3) return;
                    let adultItem = 'VIDEO TITLE: ' + body.videos[i].video.title + '\n';
                    adultItem += 'VIDEO URL: ' + body.videos[i].video.url + '\n';
                    message.client.channels.cache.get(nsfw).send(adultItem);
                }
            });
        });
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};