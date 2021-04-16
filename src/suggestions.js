const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const suggestionPath = './src/suggested.json';
var suggestionObj = readJSON(suggestionPath);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const JsonHelper = {
	read: function(p){
		return readJSON(p);
	},
	write: function(p, data){
		writeJSON(p, data);
	}
}

class SuggestionManager{
	constructor(homePage){
		this.suggestionServer = new SuggestionServer(homePage);
		this.init = function() {
			this.suggestionServer.init();
		};
	}
}

class SuggestionServer{
	constructor(homePage, port = 80){
		this.homePage = homePage;
		this.port = port;
		this.suggestionObj = readJSON(suggestionPath);
		this.init = function() {
			//takes root request and serves homepage
			app.route('/EvBot/')
				.get((req, res) => {
				res.sendFile(path.join(__dirname + homePage + '/index.html'));
			})
				.post((req, res) => {
					console.log(req.body);
					suggestionObj = readJSON(suggestionPath);
					let randomName = Math.random().toString();
					let completed = true;
					let i = 0;
					while(suggestionObj.hasOwnProperty(`${randomName} : ${req.connection.remoteAddress}`) || i == 10){
						randomName = Math.random().toString();
						i++;
					}
					let fullName = `${randomName} : ${req.connection.remoteAddress}`
					suggestionObj[fullName] = req.body;
					writeJSON(suggestionPath, suggestionObj);
			});
			//takes requests from frontend
			app.route(/.*/)
				.get((req, res) => {
					console.log("u chillin")
					res.sendFile(path.join(__dirname + homePage + req.path))
				});

			app.listen(this.port, () => {
				console.log('Server running');
			});
		}
	}
}


//json helper functions
function readJSON(p) {
	console.log("working")
	try{
		try{
			return JSON.parse(fs.readFileSync(p, 'utf-8'));
		}catch(err1){
			console.log("Error parsing JSON in readJSON() " + err1);
		}
	}catch(err){
		console.log("Error reading file " + err);
	}
	return null;
}
function writeJSON(p, data) {
	fs.writeFile(p, JSON.stringify(data, null, 2), err => {
		if(err){
			console.log("error writing JSON");
		}else{
			console.log(`Updated ${p}.`);
		}
		
	});
}

//Export the suggestionmanager class
module.exports.SuggestionManager = SuggestionManager;
module.exports.JsonHelper = JsonHelper;