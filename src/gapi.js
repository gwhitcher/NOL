/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Gapi {
    load(message) {
        const { prefix, cs_cx_id, cs_key, yt_key, google_count, youtube_count } = require('../config.json');
        const { google } = require('googleapis');
        const customsearch = google.customsearch('v1');
        const https = require('https');

        // if bot exit
        if (message.author.bot) return;

        // google search
        if (message.content.startsWith(prefix + 'google')) {
            const searchQuery = message.content.replace(prefix + 'google ', '');
            if (searchQuery.startsWith('!google')) {
                message.channel.send('Please enter a search query');
            } else {
                async function runGoogleSearch() {
                    const res = await customsearch.cse.list({
                        cx: cs_cx_id,
                        q: searchQuery,
                        auth: cs_key,
                        num: google_count,
                    });

                    for (let i = 0; i < res.data.items.length; i++) {
                        let googleItem = 'Title: ' + res.data.items[i].title + '\n';
                        googleItem += 'Description: ' + res.data.items[i].snippet + '\n';
                        googleItem += 'Link: ' + res.data.items[i].link + '\n';
                        message.channel.send(googleItem);
                    }
                }
                runGoogleSearch().catch(console.error);
            }
        }

        // youtube search
        if (message.content.startsWith(prefix + 'youtube')) {
            const searchQuery = message.content.replace(prefix + 'youtube ', '');
            if (searchQuery.startsWith('!youtube')) {
                message.channel.send('Please enter a search query');
            } else {
                const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + youtube_count + '&q=' + searchQuery + '&key=' + yt_key;
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        for (let i = 0; i < body.items.length; i++) {
                            let googleItem = 'VIDEO TITLE: ' + body.items[i].snippet.title + '\n';
                            googleItem += 'VIDEO DESCRIPTION: ' + body.items[i].snippet.description + '\n';
                            googleItem += 'VIDEO LINK: https://youtube.com/watch?v=' + body.items[i].id.videoId;
                            message.channel.send(googleItem);
                        }
                    });
                });

            }
        }

    }
}

module.exports = Gapi;