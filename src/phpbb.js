/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */

const Discord = require('discord.js');
const { token, server_id, forum_feed, forum_channel } = require('../config.json');
const http = require('http');
const xml2js = require('xml2js');

class Phpbb {

    forumPostUpdate(client) {
        const url = forum_feed;
            http.get(url, res => {
                let body = '';
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    xml2js.parseString(body, { explicitArray:false, mergeAttrs: true }, (err, result) => {
                        if(err) {
                            console.log(err);
                        }
                        let json = JSON.stringify(result, null, 4);
                        json = JSON.parse(json);
                        let entries = json.feed.entry;
                        for (let i = 0; i < entries.length; i++) {
                            let updated = entries[i].updated;
                            updated = updated.slice(0, -3);
                            let currentDateTime = new Date().toISOString();
                            currentDateTime = currentDateTime.slice(0, -8);
                            let author = entries[i].author['name'];
                            let link = entries[i].id;
                            let text = 'There is a new post by: ' + author + ' - ' + link;
                            if(updated === currentDateTime) {
                                client.channels.get(forum_channel).send(text);
                            }
                        }
                    });
                });
            });
    }
}

module.exports = Phpbb;