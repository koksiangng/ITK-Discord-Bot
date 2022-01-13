//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};