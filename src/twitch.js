/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Twitch {
    load(message) {
        const { prefix, twitch_client_id } = require('../config.json');
        const request = require('request');

        // if bot exit
        if (message.author.bot) return;

        // twitch search
        if (message.content.startsWith(prefix + 'twitch')) {
            const searchQuery = message.content.replace(prefix + 'twitch ', '');
            if (searchQuery.startsWith(prefix + 'twitch')) {
                message.channel.send('Please enter a search query');
            } else {
                const optionsUser = {
                    method: 'GET',
                    url: 'https://api.twitch.tv/helix/users?login=' + searchQuery,
                    headers: { 'Client-ID': twitch_client_id },
                };

                request(optionsUser, function(error, response, body) {
                    if (error) {
                        message.reply('Could not find specified user.');
                    } else {
                        const twitchData = JSON.parse(body);
                        const twitchUserID = twitchData.data[0].id;
                        const options = {
                            method: 'GET',
                            url: 'https://api.twitch.tv/kraken/channels/' + twitchUserID,
                            headers: { 'Client-ID': twitch_client_id },
                        };

                        request(options, function(error2, response2, body2) {
                            if (error) {
                                message.reply('Could not find that channel.');
                            } else {
                                const twitchChannelData = JSON.parse(body2);
                                // console.log(twitchChannelData);
                                let twitchMsg = 'Display Name: ' + twitchChannelData.display_name + '\n';
                                twitchMsg += 'Game: ' + twitchChannelData.game + '\n';
                                twitchMsg += 'URL: ' + twitchChannelData.url + '\n';
                                message.reply(twitchMsg);
                            }
                        });
                    }
                });
            }
        }
    }

    // in progress
    twitchAlert(client) {
        const { twitch_channel, twitch_client_id } = require('../config.json');
        const request = require('request');

        // this keeps getting overwritten.  probably need to write to a json file or DB
        const onlineArray = [];

        const twitchUser = 'asmongold';
        const optionsUser = {
            method: 'GET',
            url: 'https://api.twitch.tv/helix/users?login=' + twitchUser,
            headers: { 'Client-ID': twitch_client_id },
        };

        request(optionsUser, function(error, response, body) {
            if (error) {
                client.channels.get(twitch_channel).send('Could not find specified user.');
            } else {
                // console.log(body);
                const twitchData = JSON.parse(body);
                // console.log(twitchData);
                if (twitchData.data !== undefined) {
                    const twitchUserName = twitchData.data[0].display_name;
                    const twitchUserViewerCount = twitchData.data[0].view_count;
                    const twitchUserLoginName = twitchData.data[0].login;
                    const onlineArrayUser = onlineArray.includes(twitchUserName);
                    console.log(onlineArrayUser);
                    onlineArray.push(twitchUserName);
                    console.log(onlineArray);
                    /*
                    if(twitchUserViewerCount >= 1 && onlineArrayUser !== true) {
                    	let twitchMsg = 'Display Name: ' + twitchUserName + ' is now live!\n';
                    	twitchMsg += 'URL: https://www.twitch.tv/' + twitchUserLoginName + '\n';
                    	client.channels.get(twitch_channel).send(twitchMsg);
                    	onlineArray.push(twitchUserName);
                    }
                    */
                }


            }
        });
    }
}

module.exports = Twitch;