/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
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
    }
}

module.exports = Random;