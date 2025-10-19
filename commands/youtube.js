const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');
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
        )
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('Number of results (1-5).')
                .setMinValue(1)
                .setMaxValue(5)
        )
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('Results page (1-5).')
                .setMinValue(1)
                .setMaxValue(5)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Only you can see this')
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search');
        const reqCount = message.options.getInteger('count') ?? parseInt(youtube_count || '1', 10);
        const num = Math.min(5, Math.max(1, reqCount));
        const page = message.options.getInteger('page') ?? 1;
        try {
            const ephOpt = message.options.getBoolean('ephemeral');
            const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
            await message.deferReply({ ephemeral: eph });

            let pageToken = undefined;
            for (let i = 1; i < page; i++) {
                const preUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + 50 + '&q=' + encodeURIComponent(searchQuery) + '&key=' + yt_key + (pageToken ? '&pageToken=' + pageToken : '');
                const preResp = await axios.get(preUrl);
                pageToken = preResp.data.nextPageToken;
                if (!pageToken) break; // reached end
            }

            const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + num + '&q=' + encodeURIComponent(searchQuery) + '&key=' + yt_key + (pageToken ? '&pageToken=' + pageToken : '');
            const response = await axios.get(url);
            const data = response.data.items || [];
            if (!data.length) {
                await message.editReply('No results.');
                return;
            }
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('YouTube Results')
                .setDescription(`Query: ${searchQuery}`)
                .setTimestamp(new Date());
            const fields = data.map(d => {
                const title = d.snippet?.title || 'Untitled';
                const description = (d.snippet?.description || '').replace(/\s+/g, ' ').slice(0, 512);
                const urlItem = `https://youtube.com/watch?v=${d.id?.videoId || ''}`;
                const value = `${description}\n${urlItem}`.trim().slice(0, 1024);
                return { name: title.slice(0, 256), value };
            });
            embed.addFields(fields);
            await message.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            if (message.deferred || message.replied) {
                await message.editReply('No response.');
            } else {
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        }
    },
};
