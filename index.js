var Botkit = require('botkit')
var Witbot = require('witbot')

var slackToken = process.env.SLACK_TOKEN
var witToken = process.env.WIT_TOKEN

var controller = Botkit.slackbot({
debug: false
})

var bot =controller.spawn({
token: slackToken
}).startRTM(function(err, bot, payload){
	if(err){
	throw new Error('Error connecting to slack: ', err)
	}
	console.log('Connected to slack')
})

var witbot = Witbot(witToken)

controller.hears ('.*', 'direct_message,direct_mention', function(bot, message) {
witbot.process(message.text, bot, message)
})

witbot.hears('hello', 0.5, function (bot, message, outcome){
bot.reply(message, 'Hi! How are you')
})
