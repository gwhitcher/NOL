const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boobs')
        .setDescription('Random boobs picture (NSFW).'),
    async execute(message) {
        const randomIntBoobs = Math.floor(Math.random() * 13000) + 1;
        const urlBoobs = 'http://api.oboobs.ru/boobs/' + randomIntBoobs;
        (async () => {
            try {
                const response = await axios.get(urlBoobs);
                const adultImage = response.data[0]['preview'];
                const adultImageURL = 'http://media.oboobs.ru/' + adultImage;
                await message.client.channels.cache.get(nsfw).send(adultImageURL);
            } catch (error) {
                console.log(error.response);
                await message.reply('No response.');
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};