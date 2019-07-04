const Discord = require('discord.js');
const randomPic = require('random-puppy');
const musakui = require('musakui');

const client = new Discord.Client();

var playerNum = 0;
var playerArr = [];
var askTime = 0;

 

client.on('ready', () => {

    console.log('我准备好打十二黑了');
    client.user.setActivity("等12黑");

});

client.on('message', message => {

    if (message.content === '!12help') {
        message.channel.send('https://github.com/YundingWu/12BlackBot/blob/master/README.md');
    }

    if (message.content === '今天的十二黑打完了') {

        for( player of playerArr ) {
            player.signedUp = false;
        }

        message.channel.send('晚安');
        playerNum = 0;
    }

    if (message.content === '我要打十二黑') {   

        if(message.author.signedUp === true) {
            message.reply("你已经报过名了");
        }
        
        else {
            message.author.signedUp = true;
            if(playerArr.indexOf(message.author) === -1) {
                playerArr.push(message.author);
            }
            playerNum++;    
            message.channel.send(`现在已经有${playerNum}个人要打十二黑了`);
       }
    }

    if(message.content === '我不打十二黑了') {

        if(message.author.signedUp === undefined) {
            message.author.signedUp = false;
        }
        
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
            currentTime - askTime >= 1800 ) {
            askTime = Math.round(new Date() / 1000);
            message.channel.send(`@everyone 有无十二黑`);
        }

        message.channel.send(`现在已有${playerNum}个人想打十二黑，回复“我要打十二黑”来报名`);
       }

    if(message.content.includes('对不对')) {

        message.reply('你说的对');
    }

    if(message.content === '!gkd') {
        nsfw = client.channels.get('545441874148851722');
        if (message.channel != nsfw) {
            message.reply('图片已发送到NSFW频道');
        }
        randomPic('Overwatch_Porn')
        .then(url => {
            nsfw.send(url);
        })
        .catch(error => {
            nsfw.send('获取图片失败');
        });
    }

    if(message.content === '!aww') {
        perfect = client.channels.get('575581539241426944');
        if (message.channel != perfect) {
            message.reply('图片已发送到perfect things频道');
        }
        randomPic('aww')
        .then(url => {
            perfect.send(url);
        })
        .catch(error => {
            perfect.send('获取图片失败');
        });
    }

    if(message.content === '!test') {
        musakui('aww')
        .then(result => console.log(result.media_url))
        .catch(error => console.log(error));
    }
});
 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret