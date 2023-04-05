const { SlashCommandBuilder } = require('@discordjs/builders');
const { cat_api_key } = require('../config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Random cat picture.'),
    async execute(message) {
        const url = 'https://api.thecatapi.com/v1/images/search?api_key=' + cat_api_key;
        (async () => {
            try {
                const response = await axios.get(url);
                await message.reply(response.data[0].url.toString());
            } catch (error) {
                console.log(error.response);
                await message.reply({ content: 'No response.', ephemeral: true });
            }
        })();
    },
};