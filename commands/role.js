//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

//Role reaction.
//In order: Marine, VG, MTG, F&B, Programming, M&T, PR, TT.
var reactions = ['💚','🎮','🎴','🥧','💻','🎥','📯','🎲'];

//To add role:
//Edit/Add role to config.json, "openRoles"
//Add an emoji in "reactions"
//Go to messageReactionAdd and add a new case.
//Go to messageReactionRemove and add a new case.
//The roles have to be ordered in config.json
//e.g. if the order is "A, C, B" in config.json,
//The reaction order will be
// 1. gives role 'A'
// 2. gives role 'C'
// 3. gives role 'B'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Creates option to choose role with emojis!')
        .addStringOption(option => option
            .setName('titlename')
            .setDescription('Set title of the embed')
            .setRequired(true))
        ,
    reactions: ['💚','🎮','🎴','🥧','💻','🎥','📯','🎲'],
	async execute(interaction) {
        // Gets all roles
        //let rolemap = await interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.name).join(",");
        
        const config_roles = config.openRoles;

        /*
        const embed = new MessageEmbed()
        .setColor(config.NATgreen)
        .setTitle('Select Roles')
        .setDescription(`Reacting to the following roles will give you the desired role.\n
            You will receive information and news depending on the role you are assigned to: \n\n
            
            💚: '${config_roles[0]}'! Everything and anything related to ITK will reach you!\n
            🎮: '${config_roles[1]}'! You like video games? Want to play with others? Then this one is for you!\n
            🎴: '${config_roles[2]}'! Want to discuss which the coolest decks in MTG are? Cast Lightning bolts on people's face? Then react to this one!\n
            🥧: '${config_roles[3]}'! What's the most exquisite cuisine? What to cook next time? React this one to discuss with others!\n
            💻: '${config_roles[4]}' Is sleep-sort the best sort? Want to discuss the time-complexity of it? Then this one is for you!\n
            🎥: '${config_roles[5]}' Is sand the best spice? Or maybe young Skywalker was right... React here to discuss!\n
            📯: '${config_roles[6]}' Want to influence people of ITK? Well... reacting here gives you the power to do it!\n
            🎲: '${config_roles[7]}' Like to discuss opening moves in chess? Perhaps build a rail-empire in Ticket for Ride? React here!\n`)
        .addFields(
            {},
            {}
        );
        */
        
        const titlename = interaction.options.getString('titlename');
        const embed = new MessageEmbed()
        .setColor(config.NATgreen)
        .setTitle(titlename)
        .setDescription(`Reacting to the following roles will give you the desired role.\n
            You will receive information and news depending on the role you are assigned to: \n\n`
        );
        
        //deferReply and deleteReply is there to make it so bot replies without showing the command.
        //https://www.reddit.com/r/Discordjs/comments/r1kwg4/reply_without_replying/
        await interaction.deferReply();
        await interaction.deleteReply();

        //https://stackoverflow.com/questions/52457004/empty-message-problem-with-discord-js-embeds/52461599
        //React with all reactions representing the ITK groups.
        const msg = await interaction.channel.send({embeds: [embed]});
        
        /*
        for(let i = 0; i < reactions.length; i++){
            msg.react(reactions[i]);
        }
        */
	},
};