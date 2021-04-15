const discord = require('discord.js');;
const evanVideos = require('./videos.json');
const suggestions = require('./suggestions.js');
const suggestionLink = 'http://www.aydabserver.com/EvBot';
const evanUserID = '<@!236979977705226240>';
const evRegex = /Evan/i;

class Evan {
	constructor(){
		this.suggestionManager = new suggestions.SuggestionManager('/front_end');
		this.suggestionManager.init();
		this.liveFeed = function(message){
			let video = randomProperty(evanVideos);
			message.reply(`${video.title.replace(evRegex, evanUserID)} : ${video.url}`);
		},
		this.suggest = function(message){
			message.reply(`You can now suggest activities for Evan to do! Go to ${suggestionLink} to submit your suggestions.`);			
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