const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!')
		.addBooleanOption(option => option.setName('ephemeral').setDescription('Only you can see this')),
	async execute(message) {
		const ephOpt = message.options.getBoolean('ephemeral');
		const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
		await message.deferReply({ ephemeral: eph });
		const icon = message.guild.iconURL?.({ size: 256 });
		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setTitle(message.guild.name)
			.setThumbnail(icon || null)
			.addFields(
				{ name: 'Members', value: String(message.guild.memberCount), inline: true },
				{ name: 'ID', value: message.guild.id, inline: true },
			)
			.setTimestamp(new Date());
		await message.editReply({ embeds: [embed] });
	},
};
