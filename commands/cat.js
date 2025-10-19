const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');
const { cat_api_key } = require('../config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Random cat picture.')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Only you can see this')
        ),
    async execute(message) {
        const url = 'https://api.thecatapi.com/v1/images/search?api_key=' + cat_api_key;
        try {
            const ephOpt = message.options?.getBoolean?.('ephemeral');
            const eph = ephOpt !== null && ephOpt !== undefined ? ephOpt : await getDefaultEphemeral(message.guildId);
            await message.deferReply({ ephemeral: eph });
            const response = await axios.get(url);
            const media = response.data[0].url.toString();
            if (/\.(mp4|webm)$/i.test(media)) {
                await message.editReply(media);
            } else {
                const embed = new EmbedBuilder().setColor(0x663399).setTitle('Random Cat').setImage(media);
                await message.editReply({ embeds: [embed] });
            }
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
