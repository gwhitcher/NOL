const { SlashCommandBuilder } = require('@discordjs/builders');
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
                    await message.client.channels.cache.get(nsfw).send(adultItem);
                }
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
        await message.reply({ content: 'Check NSFW!', ephemeral: true });
    },
};