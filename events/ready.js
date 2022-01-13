//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//Bot startup
module.exports = {
	name: 'ready',
	once: true, //Run only once?
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};