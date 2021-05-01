/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class Wow {

    load(message) {

        const { prefix, wow_key, wow_secret } = require('../config.json');

        // if bot exit
        if (message.author.bot) return;

        // wow profile lookup
        if (message.content.startsWith(prefix + 'wow')) {

            const searchQuery = message.content.replace(prefix + 'wow ', '');
            const args = searchQuery.split(' ');

            if (searchQuery.startsWith('!wow')) {
                message.channel.send('Please enter arguments');
            } else {
                function wowClass(id) {
                    let wowClass = '';
                    if (id === 1) {
                        wowClass = 'Warrior';
                    } else if (id === 2) {
                        wowClass = 'Paladin';
                    } else if (id === 3) {
                        wowClass = 'Hunter';
                    } else if (id === 4) {
                        wowClass = 'Rogue';
                    } else if (id === 5) {
                        wowClass = 'Priest';
                    } else if (id === 6) {
                        wowClass = 'Death Knight';
                    } else if (id === 7) {
                        wowClass = 'Shaman';
                    } else if (id === 8) {
                        wowClass = 'Mage';
                    } else if (id === 9) {
                        wowClass = 'Warlock';
                    } else if (id === 10) {
                        wowClass = 'Monk';
                    } else if (id === 11) {
                        wowClass = 'Druid';
                    } else if (id === 12) {
                        wowClass = 'Demon Hunter';
                    }
                    return wowClass;
                }

                function wowRace(id) {
                    let wowRace = 0;
                    if (id === 1) {
                        wowRace = 'Human';
                    } else if (id === 2) {
                        wowRace = 'Orc';
                    } else if (id === 3) {
                        wowRace = 'Dwarf';
                    } else if (id === 4) {
                        wowRace = 'Night Elf';
                    } else if (id === 5) {
                        wowRace = 'Undead';
                    } else if (id === 6) {
                        wowRace = 'Tauren';
                    } else if (id === 7) {
                        wowRace = 'Gnome';
                    } else if (id === 8) {
                        wowRace = 'Troll';
                    } else if (id === 9) {
                        wowRace = 'Goblin';
                    } else if (id === 10) {
                        wowRace = 'Blood Elf';
                    } else if (id === 11) {
                        wowRace = 'Draenei';
                    } else if (id === 12) {
                        wowRace = 'Fel Orc';
                    } else if (id === 13) {
                        wowRace = 'Naga';
                    } else if (id === 14) {
                        wowRace = 'Broken';
                    } else if (id === 15) {
                        wowRace = 'Skeleton';
                    } else if (id === 16) {
                        wowRace = 'Vrykul';
                    } else if (id === 17) {
                        wowRace = 'Tuskarr';
                    } else if (id === 18) {
                        wowRace = 'Forest Troll';
                    } else if (id === 19) {
                        wowRace = 'Taunka';
                    } else if (id === 20) {
                        wowRace = 'Northrend Skeleton';
                    } else if (id === 21) {
                        wowRace = 'Ice Troll';
                    } else if (id === 22) {
                        wowRace = 'Worgen';
                    } else if (id === 23) {
                        wowRace = 'Gilnean';
                    } else if (id === 24) {
                        wowRace = 'Pandaren';
                    } else if (id === 25) {
                        wowRace = 'Pandaren';
                    } else if (id === 26) {
                        wowRace = 'Pandaren';
                    } else if (id === 27) {
                        wowRace = 'Nightborne';
                    } else if (id === 28) {
                        wowRace = 'Highmountain Tauren';
                    } else if (id === 29) {
                        wowRace = 'Void Elf';
                    } else if (id === 30) {
                        wowRace = 'Lightforged Draenei';
                    } else if (id === 31) {
                        wowRace = 'Zandalari Troll';
                    } else if (id === 32) {
                        wowRace = 'Kul Tiran';
                    } else if (id === 33) {
                        wowRace = 'Human';
                    } else if (id === 34) {
                        wowRace = 'Dark Iron Dwarf';
                    } else if (id === 35) {
                        wowRace = 'Vulpera';
                    } else if (id === 36) {
                        wowRace = 'Mag\'har Orc';
                    } else if (id === 37) {
                        wowRace = 'Mechagnome';
                    }
                    return wowRace;
                }

                function wowGender(id) {
                    let wowGender = 0;
                    if (id === 0) {
                        wowGender = 'Male';
                    } else if (id === 1) {
                        wowGender = 'Female';
                    }
                    return wowGender;
                }

                function wowFaction(id) {
                    let wowFaction = 0;
                    if (id === 0) {
                        wowFaction = 'Alliance';
                    } else if (id === 1) {
                        wowFaction = 'Horde';
                    }
                    return wowFaction;
                }

                const blizzard = require('blizzard.js').initialize({
                    key: wow_key,
                    secret: wow_secret,
                });

                blizzard.getApplicationToken()
                    .then(response => {
                        blizzard.defaults.token = response.data.access_token;
                        blizzard.wow.character(['profile'], { origin: args[0], realm: args[1], name: args[2] })
                            .then(response => {
                                // console.log(response);
                                let wowMsgItem = 'Name: ' + response.data.name + '\n';
                                wowMsgItem += 'Realm: ' + response.data.realm + '\n';
                                wowMsgItem += 'Battlegroup: ' + response.data.battlegroup + '\n';
                                wowMsgItem += 'Class: ' + wowClass(response.data.class) + '\n';
                                wowMsgItem += 'Race: ' + wowRace(response.data.race) + '\n';
                                wowMsgItem += 'Gender: ' + wowGender(response.data.gender) + '\n';
                                wowMsgItem += 'Level: ' + response.data.level + '\n';
                                wowMsgItem += 'Achievement Points: ' + response.data.achievementPoints + '\n';
                                wowMsgItem += 'Thumbnail: http://render-' + args[0] + '.worldofwarcraft.com/character/' + response.data.thumbnail + '\n';
                                wowMsgItem += 'Faction: ' + wowFaction(response.data.faction) + '\n';
                                wowMsgItem += 'Total Honorable Kills: ' + response.data.totalHonorableKills + '\n';
                                message.reply(wowMsgItem);
                            })
                            .catch(error => {
                                message.reply('Missing arguments or no data found.');
                            });
                    });
            }

        }
    }
}

module.exports = Wow;