const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

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
        const requested = message.options.getNumber('number') ?? 0;
        const number = Math.max(1, Math.min(100, Math.floor(requested)));
        let returnMessage = 'Cleaned!';

        const canManage = message.memberPermissions?.has(PermissionsBitField.Flags.ManageMessages) ||
            message.memberPermissions?.has(PermissionsBitField.Flags.Administrator);

        if (canManage) {
            try {
                await message.channel.bulkDelete(number, true);
            } catch (err) {
                console.error(err);
                returnMessage = 'There was an error deleting messages.';
            }
        } else {
            returnMessage = 'You are not allowed to prune messages.';
        }

        await message.reply({ content: returnMessage, ephemeral: true });
    },
};
