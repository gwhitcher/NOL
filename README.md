#NOL - Discord Bot
*By George Whitcher*

NOL is an open source discord bot written using the [discord.js](https://discord.js.org) library.

*Requirements:*
- [ ] [node.js](http://nodejs.org)
- [ ] [MySQL](https://www.mysql.com)
- [ ] [git](https://git-scm.com)

##Installation
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
- [ ] World Of Warcraft
    - [ ] [Create a Blizzard Developer Account](https://develop.battle.net)
    - [ ] Create a new client and update your config.json with your client ID and secret.
    
##Commands
* !help - coming soon!
* !level - Display your level.
* !top - Top users.
* !wiki XYZ - Search Wikipedia.
* !google XYZ - Search Google.
* !youtube XYZ - Search YouTube.
* !wow X Y Z - Search WoW.
* !redtube XYZ - Search redtube. (NSFW ONLY)
* !boobs - Random boobs picture. (NSFW ONLY)
* !butts - Random butts picture. (NSFW ONLY)
* !prune X - Delete posts (admin only)
* !cat - Random cat picture.
* !dog - Random dog picture.
* !gnews Y Z - Google News search.  Query (required), Domain (optional)
* !gtopnews Y Z - Search top news.  Query (required), Source (optional)
* !todaysnews - Get todays top news.
* !snews XYZ - Get top news from source.  Source (required)
* !sources - List available sources by ID.

###[Learn more at georgewhitcher.com and the NOL project.](https://github.com/gwhitcher/NOL.git)