const { SlashCommandBuilder } = require('@discordjs/builders');
const { yt_key, youtube_count } = require('../config.json');
const axios = require('axios');

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
        (async () => {
            try {
                const response = await axios.get(url);
                var data = response.data.items;
                for (let i = 0; i < data.length; i++) {
                    let googleItem = data[i].snippet.title + '\n';
                    googleItem += data[i].snippet.description + '\n';
                    googleItem += 'https://youtube.com/watch?v=' + data[i].id.videoId;
                    await message.reply(googleItem);
                }
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
    },
};