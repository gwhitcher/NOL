const { SlashCommandBuilder } = require('@discordjs/builders');
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
        ),
    async execute(message) {
        const searchQuery = message.options.getString('search') ?? '';
        const res = await customsearch.cse.list({
            cx: cs_cx_id,
            q: searchQuery,
            auth: cs_key,
            num: google_count,
        });

        for (let i = 0; i < res.data.items.length; i++) {
            let googleItem = res.data.items[i].title + '\n';
            googleItem += res.data.items[i].snippet + '\n';
            googleItem += res.data.items[i].link + '\n';
            message.reply(googleItem);
        }
    },
};