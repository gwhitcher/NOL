const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!'),
	async execute(message) {
		await message.reply(`Your tag: ${message.user.tag}\nYour id: ${message.user.id}`);
	},
};