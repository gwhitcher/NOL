const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');
const { cs_cx_id, cs_key, google_count } = require('../config.json');
const { google } = require('googleapis');
const customsearch = google.customsearch('v1');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Does a Google search.')
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
                .setDescription('Results page (1-10).')
                .setMinValue(1)
                .setMaxValue(10)
        )
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Only you can see this')
        ),
    async execute(message) {
        try {
            const searchQuery = message.options.getString('search') ?? '';
            const ephOpt = message.options.getBoolean('ephemeral');
            const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
            await message.deferReply({ ephemeral: eph });
            const reqCount = message.options.getInteger('count') ?? parseInt(google_count || '1', 10);
            const num = Math.min(5, Math.max(1, reqCount));
            const page = message.options.getInteger('page') ?? 1;
            const start = Math.min(100 - num + 1, Math.max(1, (page - 1) * num + 1));

            const res = await customsearch.cse.list({
                cx: cs_cx_id,
                q: searchQuery,
                auth: cs_key,
                num,
                start,
            });

            const items = res.data.items || [];
            if (!items.length) {
                await message.editReply('No results.');
                return;
            }

            const embed = new EmbedBuilder()
                .setColor(0x4285F4)
                .setTitle('Google Results')
                .setDescription(`Query: ${searchQuery}`)
                .setTimestamp(new Date());

            const fields = items.map(it => {
                const title = it.title || 'Untitled';
                const snippet = (it.snippet || '').replace(/\s+/g, ' ').slice(0, 512);
                const link = it.link || '';
                const value = `${snippet}\n${link}`.trim().slice(0, 1024);
                return { name: title.slice(0, 256), value };
            });
            embed.addFields(fields);
            await message.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            if (message.deferred || message.replied) {
                await message.editReply('There was an error.');
            } else {
                await message.reply({ content: 'There was an error.', ephemeral: true });
            }
        }
    },
};
