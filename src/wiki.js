/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Wiki {
    load(message) {
        const { prefix } = require('../config.json');
        const https = require('https');

        // if bot exit
        if (message.author.bot) return;

        // wiki search
        if (message.content.startsWith(prefix + 'wiki')) {
            const searchQuery = message.content.replace(prefix + 'wiki ', '');
            if (searchQuery.startsWith(prefix + 'wiki')) {
                message.channel.send('Please enter a search query');
            } else {
                const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchQuery + '&limit=1&format=json';
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        let wikiItem = 'TITLE: ' + body[1] + '\n';
                        wikiItem += 'DESCRIPTION: ' + body[2] + '\n';
                        wikiItem += 'URL: ' + body[3];
                        message.channel.send(wikiItem);
                    });
                });
            }
        }

    }
}

module.exports = Wiki;