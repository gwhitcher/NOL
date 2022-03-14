/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */

const Discord = require('discord.js');
const { token, server_id } = require('../config.json');
const client = new Discord.Client();

class Random {
    load(message) {
        const { prefix, random_dialogue } = require('../config.json');

        // if bot exit
        if (message.author.bot) return;

        // cat search
        if (message.content.startsWith(prefix + 'random')) {
            const randomItem = random_dialogue[Math.floor(Math.random() * random_dialogue.length)];
            message.channel.send(randomItem);
        }

        /*
        // set name color
        if (message.content.startsWith(prefix + 'color')) {
            const searchQuery = message.content.replace(prefix + 'color ', '');
            if (searchQuery.startsWith('!color')) {
                message.channel.send('Please enter a valid color.');
            } else {
                const author = message.author.username;
                author.replace("", "'");
                console.log(message.member.roles)
                if(message.member.roles.find(r => r.name === author)) {
                    console.log('found');
                    let role = message.member.roles.find(r => r.name === author);
                    role.setColor(searchQuery)
                    .then(updated => console.log(`Set color of role to ${role.color}`))
                    .catch(console.error);
                } else {
                    console.log('not found');
                    message.guild.createRole({
                        name: author,
                        color: searchQuery,
                        position: 8
                      })
                        .then(
                            //role => console.log(`Created new role with name ${role.name} and color ${role.color}`)
                            role => message.member.addRole(role.id)
                            .then(updated => console.log(`User added to role`))
                            .catch(console.error) +
                            console.log(role)
                            )
                        .catch(console.error)
                }
            }
        }
        */
    }
}

module.exports = Random;