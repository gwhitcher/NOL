const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(message) {
		await message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};