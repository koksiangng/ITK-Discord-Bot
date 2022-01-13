//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with Server info!'),
	async execute(interaction) {
		await interaction.reply(`This is ${interaction.guild.name}-server!`);
	},
};
