require('dotenv').config();
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const Evan = require('./evan.js');
const discord = require('discord.js');
const client = new discord.Client();
const evan = new Evan.Evan();

//console input listener
rl.on('line', (input) => {
	console.log(`Recieved: ${input}`);
});

//log on listener
client.on('ready', () => {
	console.log(`[EVBOT] ${client.user.tag} has logged in`);
});

//message recieved listener
client.on('message', (message) => {
	console.log(`[${message.author.tag} ${message.author.id}]: ${message.content}`);
	let splitInput = message.content.split(' ');
	if(splitInput[0] == '--ev'){
		if(splitInput[1] && evan.hasOwnProperty(splitInput[1])){
			evan[splitInput[1]](message);
		}else{
			evan.liveFeed(message);
		}
	}
});

//Gets bot to log in
client.login(process.env.DISCORDJS_BOT_TOKEN);

