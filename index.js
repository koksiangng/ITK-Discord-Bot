//Loads modules (https://stackoverflow.com/questions/9901082/what-is-this-javascript-require)
const { Client, Intents } = require('discord.js');

//Token saved somewhere else for security.
let data = require('./config.json');
var token = data.token;

const bot = new Client({
    //Guilds refer to the "servers" (https://discord.com/developers/docs/resources/guild)
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});


bot.once("ready", () =>{
    console.log("Bot deployed");
})

//Bot actions - responding to certain message content
bot.on("messageCreate", async message => {
    if(message.content === "!ping"){
        message.channel.send("Hi!");
    }
})

//Bot actions - reacting to certain message content
bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}

	if (commandName === 'react') {
		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}

    if (commandName === 'fruits') {
		interaction.reply('Reacting with fruits!');
		const message = await interaction.fetchReply();
		message.react('🍎');
		message.react('🍊');
		message.react('🍇');
	}
});


bot.login(token);