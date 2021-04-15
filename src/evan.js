const discord = require('discord.js');;
const evanVideos = require('./videos.json');
const suggestions = require('./suggestions.js');
class Evan {
	constructor(){
		this.liveFeed = function(message){
			let video = randomProperty(evanVideos);
			let evRegex = /Evan/i;
			message.reply(`${video.title.replace(evRegex, '<@!236979977705226240>')} : ${video.url}`);
		},
		this.suggest = function(message){
			
		}
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