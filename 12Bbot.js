const Discord = require('discord.js');

const client = new Discord.Client();

var playerNum = 0;
var askTime = 0;
 

client.on('ready', () => {

    console.log('我准备好打十二黑了');
    client.user.setActivity("等十二黑");

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

    if(message.content === '有无十二黑' ||
       message.content === '有无12黑') {

        var currentTime = Math.round(new Date() / 1000);
        if (askTime === 0 || 
            currentTime - askTime < 1800 ) {
            askTime = Math.round(new Date() / 1000);
            message.channel.send('@everyone 有无十二黑');
        }

        message.reply(`现在有${playerNum}个人想打十二黑`);
       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret