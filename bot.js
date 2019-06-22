const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTkxODMwMDY4MTYyOTg1OTkz.XQ2ymA.JelO_2hRR7oOjPJKlwRaAX9XiYw"

client.login(bot_secret_token)