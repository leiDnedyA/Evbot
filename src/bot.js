require('dotenv').config();
const Evan = require('./evan.js');
const discord = require('discord.js');
const client = new discord.Client();
const evan = new Evan.Evan();

//creates a listener which listens to an event
client.on('ready', () => {
	console.log(`[EVBOT] ${client.user.tag} has logged in`);
});

client.on('message', (message) => {
	console.log(`[${message.author.tag}]: ${message.content}`);
	let splitInput = message.content.split(' ');
	if(splitInput[0] == '--ev'){
		if(splitInput[1] && evan.hasOwnProperty(splitInput[1])){
			message.reply(evan[splitInput[1]]());
		}else{
			message.reply(evan.help());
		}
	}
});

//Gets bot to log in
client.login(process.env.DISCORDJS_BOT_TOKEN);

