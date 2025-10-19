const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boobs')
        .setDescription('Random boobs picture (NSFW).'),
    async execute(message) {
        const nsfwChannelId = nsfw;
        const target = message.client.channels.cache.get(nsfwChannelId);
        if (!target || !('nsfw' in target) || !target.nsfw) {
            await message.reply({ content: 'NSFW channel is not set correctly or not marked NSFW.', ephemeral: true });
            return;
        }
        const randomIntBoobs = Math.floor(Math.random() * 13000) + 1;
        const urlBoobs = 'http://api.oboobs.ru/boobs/' + randomIntBoobs;
        (async () => {
            try {
                const response = await axios.get(urlBoobs);
                const adultImage = response.data[0]['preview'];
                const adultImageURL = 'http://media.oboobs.ru/' + adultImage;
                await target.send(adultImageURL);
            } catch (error) {
                console.error(error);
                await message.reply('No response.');
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};
