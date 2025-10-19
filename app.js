/*
NOL2: Written by George Whitcher
Website: georgewhitcher.com
Repository: github.com/gwhitcher/NOL
*/

// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');
const { messageCount, log } = require('./assets/log');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	],
	// v14 requires Partials enum; Channel partial enables DMs
	partials: [Partials.Channel]
});
client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + '/commands/' + file);
	client.commands.set(command.data.name, command);
}

// init
client.once('ready', () => {
	console.log('Connected as ' + client.user.tag);
});

// commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		try {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		} catch (_) {
			// ignore reply failures (e.g., already replied/deferred)
		}
	}
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    try {
        await messageCount(message);
        await log(message);
    } catch (e) {
        console.error('Log error:', e);
    }
});

// login
client.login(token);
