const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addBooleanOption(option => option.setName('ephemeral').setDescription('Only you can see this')),
	async execute(message) {
		const ephOpt = message.options.getBoolean('ephemeral');
		const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
		const before = Date.now();
		await message.deferReply({ ephemeral: eph });
		const latency = Date.now() - before;
		const wsPing = message.client.ws.ping;
		const embed = new EmbedBuilder()
			.setColor(0x57F287)
			.setTitle('Pong!')
			.addFields({ name: 'Latency', value: `${latency}ms`, inline: true }, { name: 'WS', value: `${wsPing}ms`, inline: true });
		await message.editReply({ embeds: [embed] });
	},
};
