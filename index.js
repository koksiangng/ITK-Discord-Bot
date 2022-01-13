//Loads modules (https://stackoverflow.com/questions/9901082/what-is-this-javascript-require)
const { Client, Collection, Intents } = require('discord.js');

//File system https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
const fs = require('fs');



//Token saved somewhere else for security.
let data = require('./config.json');
let token = data.token;

//Imports
//const roleClaim = require('./role-claim');

const client = new Client({
    //Guilds refer to the "servers" (https://discord.com/developers/docs/resources/guild)
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ]
});

client.commands = new Collection();
//Get the commmandfiles
//https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


//Bot startup
client.once("ready", () =>{
    console.log(`${client.user.username} deployed`);
	//roleClaim(bot)
})

//Bot actions - responding to certain message content
client.on("messageCreate", message => {
    if(message.content === "!ping"){
        //message.channel.send("pong!");
		message.reply({
			content: 'pong'
		})
    }
})


//Bot actions - reacting to certain message content
//Check deploy-commands.js to check 
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	//Commands in Discord starts with /<command>
	//Ex: to run "ping", use /ping
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});


client.login(token);