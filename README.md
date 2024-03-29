# NOL - Discord Bot
*By George Whitcher*

NOL is an open source discord bot written using the [discord.js](https://discord.js.org) library.

*Requirements:*
- [ ] [node.js](http://nodejs.org)
- [ ] [MySQL](https://www.mysql.com)
- [ ] [git](https://git-scm.com)

## Installation
- [ ] Install all required files if you have not already.
- [ ] Open git bash on the directory you would like to install NOL.
- [ ] Run `git clone https://github.com/gwhitcher/NOL.git`
- [ ] Open git bash on the newly created directory and run `npm install`
- [ ] Create a MySQL database and insert the file `discord-bot-nol.sql`.
- [ ] Rename the `config.json.default` to `config.json`.
- [ ] Get your server ID by visiting your discord server through the browser and copying the *SERVERIDHERE* area `https://discordapp.com/channels/SERVERIDHERE/CHANNELIDHERE`
- [ ] If you want to use the adult features visit your NSFW channel and update the config.json file with the channel ID obtained in the step above.
- [ ] Google Custom Search & YouTube
    - [ ] [Create a custom search](https://cse.google.com/cse/all).
    - [ ] Update your config.json with the provided CSE ID.
    - [ ] [Create a project on the Google Cloud Console](https://console.cloud.google.com)
    - [ ] Choose API's & Services and activate Google Custom Search & YouTube.
    - [ ] A key will be provided.  Update your config.json with the provided key.
- [ ] Run node `deploy-commands.js` to register your commands.
- [ ] If you ever need to clean up your commands, run node `delete-commands.js` to delete your commands.
- [ ] Start the app by running `node app.js`.
    
## Commands
* /level - Display your level.
* /top - Top users.
* /wiki X - Search Wikipedia.
* /google X - Search Google.
* /youtube X - Search YouTube.
* /cat - Random cat picture.
* /dog - Random dog picture.
* /redtube X - Search redtube. (NSFW ONLY)
* /boobs - Random boobs picture. (NSFW ONLY)
* /butts - Random butts picture. (NSFW ONLY)
* /prune X - Delete posts (admin only)

### [Learn more at georgewhitcher.com](https://github.com/gwhitcher/NOL.git)