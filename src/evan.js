const discord = require('discord.js');
const evanVideos = require('./videos.json')

class Evan {
	constructor(){
		this.liveFeed = function(message){
			let video = randomProperty(evanVideos);
			message.reply(`${video.title} : ${video.url}`);
		},
		this.help = function(message){
			message.reply(`Ask me what Evan is doing with the following commands: --ev <${Object.getOwnPropertyNames(this)}>`)
		}
	}

	
}



//helper functions
function randomProperty(obj){
	var keys = Object.keys(obj);
	return obj[keys[keys.length * Math.random() << 0]];
}

//exports
module.exports.Evan = Evan;