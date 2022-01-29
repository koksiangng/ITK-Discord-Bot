//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with wtf!'),
	async execute(interaction) {
		await interaction.reply('wtf!');
	},
};
