const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { random_dialogue } = require('../config.json');
const { getDefaultEphemeral } = require('../assets/guildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Gets a random image or string from the config.')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Only you can see this')
        ),
    async execute(message) {
        const ephOpt = message.options.getBoolean('ephemeral');
        const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
        await message.deferReply({ ephemeral: eph });
        const randomItem = random_dialogue[Math.floor(Math.random() * random_dialogue.length)] ?? 'No random items set.';
        if (/^https?:\/\//i.test(randomItem)) {
            const embed = new EmbedBuilder().setColor(0x00A0A0).setTitle('Random').setImage(randomItem);
            await message.editReply({ embeds: [embed] });
        } else {
            await message.editReply(randomItem);
        }
    },
};
