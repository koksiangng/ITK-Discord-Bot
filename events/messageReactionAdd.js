//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//https://stackoverflow.com/questions/66775729/how-can-i-find-the-id-of-a-custom-emoji-the-user-sent-and-add-it-to-the-server
const config = require(`../config.json`)

//Adding upon message reaction.
module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user) {
		
		//The bot now "remembers" the message.
		if(reaction.partial){
			try{
				await reaction.fetch();
			} catch(error){
				console.error('Something went wrong when fetching the message:', error);
				return;
			}
		}

		//If the reactor is the bot - return
		let clientId = config.clientId;
		if(user.id === clientId) return;

		//Get role channel id
		let channelId = config.roleChannelId;
		/*
		if (!reaction.message.channelId === channelId){
			return;
		}
		*/

		//Get message based on the reaction
		const msg = await reaction.message;

		//Get the fields of the embed
		var oldFields;
		if (msg.embeds[0].fields != null){
			oldFields = msg.embeds[0].fields;
		}

		//Find the member of reacted to the message.
		const member = reaction.message.guild.members.cache.find(member => member.id === user.id);

		//Get the role from the field in embed message and assign that to the user.

		//Regex to filter out numbers from the string
		//The information looks like: "emoji:<@&932587792196849704>"
		//https://stackoverflow.com/questions/64053658/get-emojis-from-message-discord-js-v12
		let numberRegex = new RegExp('[0-9]', 'g');
		for(let i = 0; i < oldFields.length; i++){
			if(i === 0){
				console.log(reaction._emoji);
				console.log("oldfields");
				//<:SithDante:939986916089155594>:<@&931929374188523580>
				//😳:<@&932587538894422046>
				console.log(oldFields[i].value);
			}

			if(reaction._emoji.name === oldFields[i].value.split(':')[0]){
				let roleId = oldFields[i].value.match(numberRegex).join("");
				member.roles.add(roleId);
				let roleName = await reaction.message.guild.roles.fetch(roleId).then(role => role.name);
				member.send(`You now have the role of "${roleName}."`);
				return;
			}
		}
	},
};