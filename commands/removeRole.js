//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

//names need to be all lower case - Discord API
module.exports = {
	data: new SlashCommandBuilder()
		.setName('removerole')
		.setDescription('Removes a role to the role embed'),
	async execute(interaction) {
		await interaction.reply('wtf!');
	},
};
