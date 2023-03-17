/*
NOL2: Written by George Whitcher
Website: georgewhitcher.com
Repository: github.com/gwhitcher/NOL
*/

// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { messageCount, log } = require('./assets/log');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
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
client.on('interactionCreate', async message => {

	if (!message.isCommand()) return;

	const command = client.commands.get(message.commandName);

	if (!command) return;

	try {
		await command.execute(message);
	} catch (error) {
		console.error(error);
		await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	//log
	messageCount(message);
	log(message);
});

// login
client.login(token);