const { SlashCommandBuilder } = require('@discordjs/builders');
const http = require('http');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('butts')
        .setDescription('Random butts picture (NSFW).'),
    async execute(message) {
        const randomIntButts = Math.floor(Math.random() * 6800) + 1;
        const urlButts = 'http://api.obutts.ru/butts/' + randomIntButts;
        http.get(urlButts, res => {
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                const adultImage = body[0]['preview'];
                const adultImageURL = 'http://media.obutts.ru/' + adultImage;
                message.client.channels.cache.get(nsfw).send(adultImageURL);
            });
        });
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};