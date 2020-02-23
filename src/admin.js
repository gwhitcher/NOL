/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Admin {
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