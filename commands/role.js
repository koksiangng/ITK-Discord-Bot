//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

//Role reaction code.
active_reactions = ['💚'];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Creates option to choose role with emojis!'),
	async execute(interaction) {
        const embed = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Roles')
        .setDescription('Test: \n\n'
            + '1\n'
            + '2');
        
        //deferReply and deleteReply is there to make it so bot replies with showing the command.
        //https://www.reddit.com/r/Discordjs/comments/r1kwg4/reply_without_replying/
        await interaction.deferReply();
        await interaction.deleteReply();

        //https://stackoverflow.com/questions/52457004/empty-message-problem-with-discord-js-embeds/52461599
        const msg = await interaction.channel.send({embeds: [embed]});
        msg.react('💚');

        //includecheck: checks if relevant emoji has been reacted with
        //idcheck: checks that it's not the author (Nat)
        const filter = (reaction, user) => {
            const includecheck = active_reactions.includes(reaction.emoji.name);
            const idcheck = user.id !== msg.author.id;
            return includecheck && idcheck;
        };

        const collector = msg.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            //const role = await msg.guild.roles.fetch(931929374188523580);
            //const role = interaction.options.getRole("Marine");
            //const role = await msg.guild.roles;
            
            //role.array.forEach(role => { console.log(role.name, role.id)          
            //});
            //console.log(role);
            //msg.guild.members.fetch(user.id).then(member => {
            //    member.roles.add(role);
            //})
            //reaction.message.guild.members.cache.get(user.id).roles.add(role);
            reaction.message.guild.members.cache.get(user.id).roles.add("931929374188523580");
        })
	},
};