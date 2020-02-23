/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Adult {
    load(message) {
        const { prefix, nsfw } = require('../config.json');
        const https = require('https');
        const http = require('http');


        // if bot exit
        if (message.author.bot) return;

        // redtube search
        if (message.content.startsWith(prefix + 'redtube')) {

            const searchQuery = message.content.replace(prefix + 'redtube ', '');

            if (searchQuery.startsWith('!redtube')) {
                message.channel.send('Please enter a search query');
            } else if (nsfw === '') {
                message.channel.send('NSFW ID missing');
            } else {
                const url = 'https://api.redtube.com/?data=redtube.Videos.searchVideos&search=' + searchQuery + '&thumbsize=all&output=json';
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        for (let i = 0; i < body.videos.length; i++) {
                            if (i === 3) return;
                            let adultItem = 'VIDEO TITLE: ' + body.videos[i].video.title + '\n';
                            adultItem += 'VIDEO URL: ' + body.videos[i].video.url + '\n';
                            message.client.channels.get(nsfw).send(adultItem);
                        }
                    });
                });
            }
        }

        // boobs search
        if (message.content.startsWith(prefix + 'boobs')) {
            if (nsfw === '') {
                message.channel.send('NSFW ID missing');
            } else {
                const randomInt = Math.floor(Math.random() * 13000) + 1;
                const url = 'http://api.oboobs.ru/boobs/' + randomInt;
                http.get(url, res => {
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        const adultImage = body[0]['preview'];
                        const adultImageURL = 'http://media.oboobs.ru/' + adultImage;
                        message.client.channels.get(nsfw).send(adultImageURL);
                    });
                });
            }
        }

        // butts search
        if (message.content.startsWith(prefix + 'butts')) {
            if (nsfw === '') {
                message.channel.send('NSFW ID missing');
            } else {
                const randomInt = Math.floor(Math.random() * 6800) + 1;
                const url = 'http://api.obutts.ru/butts/' + randomInt;
                http.get(url, res => {
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        const adultImage = body[0]['preview'];
                        const adultImageURL = 'http://media.obutts.ru/' + adultImage;
                        message.client.channels.get(nsfw).send(adultImageURL);
                    });
                });
            }
        }

    }
}

module.exports = Adult;