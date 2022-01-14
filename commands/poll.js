//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageReaction, User } = require('discord.js');
const messageCreate = require('../events/messageCreate');

//https://discordjs.guide/interactions/registering-slash-commands.html#options
//Options
var reaction_numbers = ["\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
//Currently 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sets up a poll with desired amount of voting choices (max 9)')
        //.addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true))
        .addIntegerOption(option => option
            .setName('poll')
            .setDescription('Enter amount of options (max 9)')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('time')
            .setDescription('Enter the amount of time in minutes')
            .setRequired(true))
        ,
	async execute(interaction) {


        const amount = interaction.options.getInteger('poll');
        const t = interaction.options.getInteger('time') * 1000 * 60; // => to 1 sec => to 1 min 
        const msg = await interaction.reply({ content: 'React to vote', fetchReply: true});

        for(let i = 0; i < amount; i++){
            msg.react(reaction_numbers[i]);
        }
        
        
	},
};
