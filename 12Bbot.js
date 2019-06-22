const Discord = require('discord.js');

const client = new Discord.Client();

var playerNum = 0;
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === '我要打十二黑') {
        
        if(message.author.signedUp === true) {
            message.reply("你已经报过名了");
        }
        else {
            message.author.signedUp = true;
            playerNum++;    
            message.channel.send(`现在已经有${playerNum}个人要打十二黑了`);
       }
    }

    if(message.content === '我不打十二黑了') {
        
        if(message.author.signedUp === false) {
            message.reply("你本来就不打");
        }
        else {
            message.author.signedUp = false;
            playerNum--;    
            message.channel.send(`现在还有${playerNum}个人要打十二黑`);
        }
    }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret