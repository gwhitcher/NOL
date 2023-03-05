const { SlashCommandBuilder } = require('@discordjs/builders');
const http = require('http');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boobs')
        .setDescription('Random boobs picture (NSFW).'),
    async execute(message) {
        const randomIntBoobs = Math.floor(Math.random() * 13000) + 1;
        const urlBoobs = 'http://api.oboobs.ru/boobs/' + randomIntBoobs;
        http.get(urlBoobs, res => {
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                const adultImage = body[0]['preview'];
                const adultImageURL = 'http://media.oboobs.ru/' + adultImage;
                message.client.channels.cache.get(nsfw).send(adultImageURL);
            });
        });
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};