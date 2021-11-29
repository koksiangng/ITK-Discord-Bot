//Loads modules (https://stackoverflow.com/questions/9901082/what-is-this-javascript-require)
const Discord = require('discord.js');

let data = require('./env.json');
var token = data.data.token;

//Token stored somewhere else, for safety.
/*token = fetch('./env.json')
    .then(response => response.json())
    .then(data => data.token)
    .catch(error => console.log("Can't find token"));
*/

const client = new Discord.Client({
    allowedMentions:{
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS",
    ]
});

//Displays on server.
client.on("ready", () =>{
    console.log("Bot deployed");
})

client.on("messageCreate", async message => {
    if(message.content === "!ping"){
        message.channel.send("Hi!");
    }
})


client.login(token);