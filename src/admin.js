/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */

const modArray = [];

class Admin {

    //test spam prevention
    messageLimit(client, message) {
        // if bot exit
        if (message.author.bot) return;

        //vars
        let messageArray = [];
        let messageCount = 10;
        let time = 5;
        let spamCount = 3;
        let spam = false;
        let dateTime = new Date();
        dateTime.setSeconds(dateTime.getSeconds() - time);
        let dateString = new Date(dateTime);

        //fetch messages
        message.channel.fetchMessages({ limit: messageCount }).then(messages => {

            //loop through messages
            messages.forEach(function (messageItem) {
                if (messageItem.createdAt >= dateString) {
                    messageArray.push(messageItem.author.id);
                }
            });

            //get count
            let counts = {};
            messageArray.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });

            //check for spam
            for (var item in counts) {
                if (counts[item] >= spamCount) {
                    spam = true;
                    modArray.push(item);
                }
            }
            //console.log(modArray);

            //spam message
            if (spam) {
                message.channel.send('Please stop spamming.');
            }

            //get spam user count
            let countsMod = {};
            modArray.forEach((i) => { countsMod[i] = ++countsMod[i] || 1 });
            //console.log(countsMod);

            //kick users
            for (var modItem in countsMod) {
                console.log(countsMod[modItem]);
                if (countsMod[modItem] >= spamCount) {
                    let member = message.guild.member(modItem);
                    member.kick();
                }
            }
        }).catch(console.error);
    }

    load(message) {
        const { prefix } = require('../config.json');

        // if bot exit
        if (message.author.bot) return;

        // prune
        if (message.content.startsWith(prefix + 'prune')) {

            const int = message.content.replace(prefix + 'prune ', '');
            const amount = parseInt(int);
            if (message.guild.roles.find(role => role.name === 'Administrator')) {
                if (isNaN(amount)) {
                    return message.reply('that doesn\'t seem to be a valid number.');
                } else if (amount < 2 || amount > 100) {
                    return message.reply('you need to input a number between 2 and 100.');
                }
                message.channel.bulkDelete(amount, true).catch(err => {
                    console.error(err);
                    message.channel.send('there was an error trying to prune messages in this channel!');
                });
            }
        }
    }
}

module.exports = Admin;