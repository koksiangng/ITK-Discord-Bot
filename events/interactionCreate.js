//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//Bot actions - interactions
//Check deploy-commands.js to check 
//Currently no idea how to integrate index.js interactionCreate with this one.
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};