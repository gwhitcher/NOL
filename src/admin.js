/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */

const modArray = [];
const countsMod = {};

class Admin {

    /*
    //test spam prevention
    messageLimit(client, message) {
        // if bot exit
        if (message.author.bot) return;

        //const modArray = [];
        const messageArray = [];
        //const countsMod = {};
        let count = 3;
        let time = 5;
        let dateTime = new Date();
        //console.log(dateTime);
        dateTime.setSeconds(dateTime.getSeconds() - time);
        let dateString = new Date(dateTime);
        //console.log(dateString);
        message.channel.fetchMessages({ limit: count }).then(messages => {
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
            //console.log(counts);

            //check for spam
            let spam = false;
            for (var item in counts) {
                if (counts[item] >= count) {
                    spam = true;
                    modArray.push(item);
                }
            }
            //console.log(modArray);

            if(spam) {
                message.channel.send('Please stop spamming.');
            }

            //get spam user count
            modArray.forEach(function (spamCount) {
                countsMod[spamCount] = (countsMod[spamCount] || 0) + 1;
            });
            console.log(countsMod);

            //kick users
            for (var modItem in countsMod) {
                if (countsMod[modItem] >= count) {
                    let member = message.guild.member(modItem);
                    message.channel.send('User ' + member.displayName + ' has been kicked.');
                    member.kick();
                }
            }
        }).catch(console.error);
    }
    */

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