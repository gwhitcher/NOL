/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Animals {
    load(message) {
        const { prefix } = require('../config.json');
        const https = require('https');

        // if bot exit
        if (message.author.bot) return;

        // cat search
        if (message.content.startsWith(prefix + 'cat')) {
            const url = 'https://aws.random.cat/meow';
            https.get(url, res => {
                res.setEncoding('utf8');
                let body = '';
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    body = JSON.parse(body);
                    const catItem = body.file + '\n';
                    message.channel.send(catItem);
                });
            });
        }

        // dog search
        if (message.content.startsWith(prefix + 'dog')) {
            const url = 'https://random.dog/woof.json';
            https.get(url, res => {
                res.setEncoding('utf8');
                let body = '';
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    body = JSON.parse(body);
                    const dogItem = body.url + '\n';
                    message.channel.send(dogItem);
                });
            });
        }

    }
}

module.exports = Animals;