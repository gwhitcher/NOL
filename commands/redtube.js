const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
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
        const nsfwChannelId = nsfw;
        const target = message.client.channels.cache.get(nsfwChannelId);
        if (!target || !('nsfw' in target) || !target.nsfw) {
            await message.reply({ content: 'NSFW channel is not set correctly or not marked NSFW.', ephemeral: true });
            return;
        }
        const search = message.options.getString('search') ?? '';
        const url = 'https://api.redtube.com/?data=redtube.Videos.searchVideos&search=' + search + '&thumbsize=all&output=json';
        (async () => {
            try {
                const response = await axios.get(url);
                var data = response.data.videos;
                for (let i = 0; i < data.length; i++) {
                    if (i === 3) return;
                    let adultItem = '';
                    adultItem += 'VIDEO TITLE: ' + data[i].video.title + '\n';
                    adultItem += 'VIDEO URL: ' + data[i].video.url + '\n';
                    await target.send(adultItem);
                }
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};
