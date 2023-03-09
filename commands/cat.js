const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Random cat picture.'),
    async execute(message) {
        const url = 'https://aws.random.cat/meow';
        (async () => {
            try {
                const response = await axios.get(url);
                await message.reply(response.data.file.toString());
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
    },
};