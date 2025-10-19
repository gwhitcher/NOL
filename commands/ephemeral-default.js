const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { setDefaultEphemeral, getDefaultEphemeral } = require('../assets/guildSettings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ephemeral-default')
    .setDescription('Set or view the default ephemeral behavior for this server.')
    .addBooleanOption(option => option.setName('value').setDescription('true = ephemeral by default, false = public by default')),
  async execute(interaction) {
    const current = await getDefaultEphemeral(interaction.guildId);
    const newVal = interaction.options.getBoolean('value');

    if (newVal === null) {
      await interaction.reply({ content: `Current default ephemeral: ${current}`, ephemeral: true });
      return;
    }

    const canManage = interaction.memberPermissions?.has(PermissionsBitField.Flags.ManageGuild) ||
      interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator);
    if (!canManage) {
      await interaction.reply({ content: 'You are not allowed to change settings.', ephemeral: true });
      return;
    }

    await setDefaultEphemeral(interaction.guildId, newVal);
    await interaction.reply({ content: `Default ephemeral updated to: ${newVal}`, ephemeral: true });
  },
};

