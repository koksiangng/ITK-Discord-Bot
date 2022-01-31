//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const config = require(`../config.json`)

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user) {
		
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
		console.log(msg);

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
		let numberRegex = new RegExp('[0-9]', 'g');
		for(let i = 0; i < oldFields.length; i++){
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