const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Clean up messages (admin only).')
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('The number of messages to clean up.')
                .setRequired(true)
        ),
    async execute(message) {
        const number = message.options.getNumber('number') ?? 0;
        let returnMessage = 'Cleaned!';
        if (message.guild.roles.cache.find(role => role.name === 'Administrator')) {
            message.channel.bulkDelete(number, true).catch(err => {
                console.error(err);
                returnMessage = "There was an error sending the message";
            });
        }
        else {
            returnMessage = "You are not an admin!";
        }
        await message.reply({ content: returnMessage, ephemeral: true });
    },
};