const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Random dog picture.'),
    async execute(message) {
        const url = 'https://random.dog/woof.json';
        (async () => {
            try {
                const response = await axios.get(url);
                await message.reply(response.data.url.toString());
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
    },
};