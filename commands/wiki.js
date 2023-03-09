const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('Search Wikipedia')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('The searh keyword.')
                .setRequired(true)
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search');
        const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchQuery + '&limit=1&format=json';
        (async () => {
            try {
                const response = await axios.get(url);
                await message.reply(response.data[3].toString());
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
    },
};