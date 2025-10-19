const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { nsfw } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('butts')
        .setDescription('Random butts picture (NSFW).'),
    async execute(message) {
        const nsfwChannelId = nsfw;
        const target = message.client.channels.cache.get(nsfwChannelId);
        if (!target || !('nsfw' in target) || !target.nsfw) {
            await message.reply({ content: 'NSFW channel is not set correctly or not marked NSFW.', ephemeral: true });
            return;
        }
        const randomIntButts = Math.floor(Math.random() * 6800) + 1;
        const urlButts = 'http://api.obutts.ru/butts/' + randomIntButts;
        (async () => {
            try {
                const response = await axios.get(urlButts);
                const adultImage = response.data[0]['preview'];
                const adultImageURL = 'http://media.obutts.ru/' + adultImage;
                await target.send(adultImageURL);
            } catch (error) {
                console.error(error);
                await message.reply('No response.');
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};
