const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('butts')
        .setDescription('Random butts picture (NSFW).'),
    async execute(message) {
        const randomIntButts = Math.floor(Math.random() * 6800) + 1;
        const urlButts = 'http://api.obutts.ru/butts/' + randomIntButts;
        (async () => {
            try {
                const response = await axios.get(urlButts);
                const adultImage = response.data[0]['preview'];
                const adultImageURL = 'http://media.obutts.ru/' + adultImage;
                await message.client.channels.cache.get(nsfw).send(adultImageURL);
            } catch (error) {
                console.log(error.response);
                await message.reply('No response.');
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};