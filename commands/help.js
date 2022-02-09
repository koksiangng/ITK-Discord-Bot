//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

//File system https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
const fs = require('fs');

//Token saved somewhere else for security.
const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a list of commands I have!'),
	async execute(interaction) {
		//await interaction.reply('wtf!');

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

        console.log(commandFiles);
        
        let description = "";
        for(const command of commandFiles){
            description = description.concat("/", command.substring(0, command.length - 3), '\n');
        }
        console.log(description);

        //Creating a new embed to hold
        const embed = new MessageEmbed()
        .setColor(config.NATgreen)
        .setTitle("Commands I currently have")
        .setDescription(description)
        ;

        //deferReply and deleteReply is there to make it so bot replies without showing the command.
        //https://www.reddit.com/r/Discordjs/comments/r1kwg4/reply_without_replying/
        await interaction.deferReply();
        await interaction.deleteReply();

        //Send the embed
        await interaction.channel.send({embeds: [embed]});
	},
};
