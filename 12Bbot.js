const Discord = require('discord.js');

const client = new Discord.Client();

var playerNum = 0;
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === '我要打十二黑') {

        playerNum++;    
        message.channel.send(`现在已经有${playerNum}个人要打十二黑了`);

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret