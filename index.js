//Loads modules (https://stackoverflow.com/questions/9901082/what-is-this-javascript-require)
const { Client, Collection, Intents } = require('discord.js');

//File system https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
const fs = require('fs');

//Token saved somewhere else for security.
const config = require('./config.json');
let token = config.token;

//Imports
//const roleClaim = require('./role-claim');

const client = new Client({
    //Guilds refer to the "servers" (https://discord.com/developers/docs/resources/guild)
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ]
});

client.commands = new Collection();
//Get the command and eventfiles
//https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//Have to run:
//node deploy-commands.js
//when edited/added new commands.
//For commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//For events
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Will try to integrate into "interactionCreate.js"
//Mainly used to activate commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

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