const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search Wikipedia')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('The searh keyword.')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Only you can see this')
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search');
        const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURIComponent(searchQuery) + '&limit=1&format=json';
        try {
            const ephOpt = message.options.getBoolean('ephemeral');
            const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
            await message.deferReply({ ephemeral: eph });
            const response = await axios.get(url);
            const titles = response.data?.[1] || [];
            const descs = response.data?.[2] || [];
            const links = response.data?.[3] || [];
            const title = titles?.[0];
            const desc = descs?.[0];
            const link = links?.[0];
            if (!link) {
                await message.editReply('No results.');
                return;
            }
            const embed = new EmbedBuilder()
                .setColor(0x2A5DB0)
                .setTitle(title || 'Wikipedia')
                .setURL(link)
                .setDescription((desc || '').slice(0, 2048));
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
