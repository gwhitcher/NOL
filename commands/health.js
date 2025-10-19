const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('health')
    .setDescription('Bot health and latency.'),
  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    const uptimeSec = Math.floor(process.uptime());
    await interaction.reply(`ok | ping: ${ping}ms | uptime: ${uptimeSec}s`);
  },
};

