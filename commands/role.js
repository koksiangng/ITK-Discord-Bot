//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const config = require('../config.json');
const secret = require('../secret.json');
var fs = require('fs');

//Role reaction.

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Creates option to choose role with emojis!')
        ,
	async execute(interaction) {
        //Only members with the permission can do this command, otherwise return.
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
            await interaction.member.send("You don't have permission to manage roles. Blame the root/soot 😇");
            return;
        }

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
        secret.roleCommentId = msg.id;
        fs.writeFile('secret.json', JSON.stringify(secret, null, 2), function writeJSON(err){
            if(err) return console.log(err);
        })
        
	},
};