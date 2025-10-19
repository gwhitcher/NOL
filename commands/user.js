const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDefaultEphemeral } = require('../assets/guildSettings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!')
		.addBooleanOption(option => option.setName('ephemeral').setDescription('Only you can see this')),
	async execute(message) {
		const ephOpt = message.options.getBoolean('ephemeral');
		const eph = ephOpt !== null ? ephOpt : await getDefaultEphemeral(message.guildId);
		await message.deferReply({ ephemeral: eph });
		const avatar = message.user.displayAvatarURL?.({ size: 256 });
		const embed = new EmbedBuilder()
			.setColor(0x00AA88)
			.setTitle(message.user.tag)
			.setThumbnail(avatar || null)
			.addFields(
				{ name: 'ID', value: message.user.id, inline: true },
			)
			.setTimestamp(new Date());
		await message.editReply({ embeds: [embed] });
	},
};
