/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
/*
Discord BOT: Written by George Whitcher
Website: georgewhitcher.com
Repository: github.com/gwhitcher/discord-bot
*/

// imports
const Discord = require('discord.js');
const { token, server_id } = require('./config.json');
const client = new Discord.Client();
const Logs = require('./src/logs');
const Levels = require('./src/levels');
const Admin = require('./src/admin');
const Gapi = require('./src/gapi');
const Wiki = require('./src/wiki');
const Wow = require('./src/wow');
const Twitch = require('./src/twitch');
const Adult = require('./src/adult');
const Animals = require('./src/animals');
const Random = require('./src/random');
const News = require('./src/news');
const Phpbb = require('./src/phpbb');
const fs = require('fs');

// functions
const logFunctions = new Logs();
const levelsFunctions = new Levels();
const adminFunctions = new Admin();
const googleFunctions = new Gapi();
const wikiFunctions = new Wiki();
const wowFunctions = new Wow();
const twitchFunctions = new Twitch();
const adultFunctions = new Adult();
const animalFunctions = new Animals();
const newsFunctions = new News();
const randomFunctions = new Random();
const phpbbFunctions = new Phpbb();


// init
client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);

    // setInterval( function() { twitchFunctions.twitchAlert(client); }, 500 );

    // create folders for logs
    const server = client.guilds.get(server_id);
    for (let i = 0; i < server.channels.array().length; i++) {
        const type = server.channels.array()[i].type;
        if (type === 'text') {
            const dirName = server.channels.array()[i].name;
            const dir = 'logs/' + dirName;
            fs.existsSync(dir) || fs.mkdirSync(dir);
        }
    }
});

// messages
client.on('message', (message) => {
    logFunctions.load(message);
    levelsFunctions.load(message);
    adminFunctions.load(message);
    googleFunctions.load(message);
    wikiFunctions.load(message);
    wowFunctions.load(message);
    twitchFunctions.load(message);
    adultFunctions.load(message);
    animalFunctions.load(message);
    newsFunctions.load(message, client);
    randomFunctions.load(message);
    //adminFunctions.messageLimit(client, message);
});

// guild member join
client.on('guildMemberAdd', (member) => {
    const guild = member.guild;
    guild.channels.find(channel => channel.name === 'general').send('Welcome ' + member.user);
});

// guild member leave
client.on('guildMemberRemove', (member) => {
    const guild = member.guild;
    guild.channels.find(channel => channel.name === 'general').send('Bye ' + member.user);
});

//repeating functions
setInterval(function(){ 
    newsFunctions.scheduledNews(client); 
    adultFunctions.scheduledPosts(client);
}, 60000);
setInterval(function(){ 
    phpbbFunctions.forumPostUpdate(client);
}, 30001);

// token login
client.login(token);