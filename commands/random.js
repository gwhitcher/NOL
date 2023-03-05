const { SlashCommandBuilder } = require('@discordjs/builders');
const { random_dialogue } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Gets a random image or string from the config.'),
    async execute(message) {
        const randomItem = random_dialogue[Math.floor(Math.random() * random_dialogue.length)] ?? 'No random items set.';
        await message.reply(randomItem);
    },
};