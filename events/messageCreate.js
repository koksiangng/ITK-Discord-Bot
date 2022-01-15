//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//On message create
module.exports = {
	name: 'messageCreate',
	execute(message) {
		if(message.content === "!ping"){
            //message.channel.send("pong!");
		    message.reply({
			    content: 'pong!'
		    })
        }
	},
};
