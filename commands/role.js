//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
var fs = require('fs');

//Role reaction.
//In order: Marine, VG, MTG, F&B, Programming, M&T, PR, TT.
//Fitting emojis: ['💚','🎮','🎴','🥧','💻','🎥','📯','🎲'];

/*
Suggested descriptions... although
You will receive information and news depending on the role you are assigned to: \n\n
            
💚: '${config_roles[0]}'! Everything and anything related to ITK will reach you!\n
🎮: '${config_roles[1]}'! You like video games? Want to play with others? Then this one is for you!\n
🎴: '${config_roles[2]}'! Want to discuss which the coolest decks in MTG are? Cast Lightning bolts on people's face? Then react to this one!\n
🥧: '${config_roles[3]}'! What's the most exquisite cuisine? What to cook next time? React this one to discuss with others!\n
💻: '${config_roles[4]}' Is sleep-sort the best sort? Want to discuss the time-complexity of it? Then this one is for you!\n
🎥: '${config_roles[5]}' Is sand the best spice? Or maybe young Skywalker was right... React here to discuss!\n
📯: '${config_roles[6]}' Want to influence people of ITK? Well... reacting here gives you the power to do it!\n
🎲: '${config_roles[7]}' Like to discuss opening moves in chess? Perhaps build a rail-empire in Ticket for Ride? React here!\n`)
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Creates option to choose role with emojis!')
        ,
	async execute(interaction) {

        //The embed message
        const embed = new MessageEmbed()
        .setColor(config.NATgreen)
        .setTitle("Role selection")
        .setDescription(`Reacting to the following roles will give you the desired role.\n
            You will receive information and news depending on the role you are assigned to: \n\n`
        );
        
        //deferReply and deleteReply is there to make it so bot replies without showing the command.
        //https://www.reddit.com/r/Discordjs/comments/r1kwg4/reply_without_replying/
        await interaction.deferReply();
        await interaction.deleteReply();

        //https://stackoverflow.com/questions/52457004/empty-message-problem-with-discord-js-embeds/52461599
        const msg = await interaction.channel.send({embeds: [embed]});

        //Add the msg id to config
        //https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
        config.roleCommentId = msg.id;
        fs.writeFile('config.json', JSON.stringify(config, null, 2), function writeJSON(err){
            if(err) return console.log(err);
        })
        
	},
};