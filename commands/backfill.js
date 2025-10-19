const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { query } = require('../assets/mysql');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('backfill')
    .setDescription('Backfill author_id from usernames (admin only).'),
  async execute(interaction) {
    const canManage = interaction.memberPermissions?.has(PermissionsBitField.Flags.ManageGuild) ||
      interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator);
    if (!canManage) {
      await interaction.reply({ content: 'You are not allowed to run backfill.', ephemeral: true });
      return;
    }
    await interaction.deferReply({ ephemeral: true });

    try {
      // Ensure member cache is populated
      await interaction.guild.members.fetch();

      const rows = await query('SELECT id, author FROM message_count WHERE author_id IS NULL');
      let updated = 0;
      let ambiguous = 0;
      let missing = 0;

      for (const row of rows) {
        const matches = interaction.guild.members.cache.filter(m => m.user.username === row.author);
        if (matches.size === 1) {
          const userId = matches.first().user.id;
          await query('UPDATE message_count SET author_id = ?, author = ? WHERE id = ?', [userId, matches.first().user.username, row.id]);
          updated += 1;
        } else if (matches.size === 0) {
          missing += 1;
        } else {
          ambiguous += 1;
        }
      }

      await interaction.editReply(`Backfill complete. Updated: ${updated}, missing: ${missing}, ambiguous: ${ambiguous}`);
    } catch (e) {
      console.error(e);
      await interaction.editReply('Backfill failed. See logs.');
    }
  },
};

