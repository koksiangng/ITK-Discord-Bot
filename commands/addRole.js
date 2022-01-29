//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

//https://discordjs.guide/popular-topics/embeds.html#resending-and-editing
//Editing seems to not update the cache, which we will possibly need to remember who reacted to who on add role.
//So editing the embed might require a whole new embed, if we use embed.

//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md
//For how emoji works.

//names need to be all lower case - Discord API
//role message id 936989066115829822
module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Adds a role to the role embed')
        .addStringOption(option => option
            .setName('emoji')
            .setDescription('Input emoji of choice')
            .setRequired(true))
        ,
	async execute(interaction) {
        //.then(msg => console.log(msg.content))
        const t = interaction.options.getString('Emoji')

        const msg = await interaction.channel.messages.fetch("936989066115829822");
        console.log(msg);
        console.log("msg.content");
        console.log(msg.content);
        const msgId = 936989066115829822;
		await interaction.reply(t);
	},
};
