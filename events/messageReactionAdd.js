//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//https://stackoverflow.com/questions/66775729/how-can-i-find-the-id-of-a-custom-emoji-the-user-sent-and-add-it-to-the-server
const config = require(`../config.json`)

//Custom emoji

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
		//Custom emoji
		//<:emoji:939986916089155594>:<@&931929374188523580>
		//Unicode emoji
		//😳:<@&932587538894422046>
		//https://www.reddit.com/r/Discord_Bots/comments/iicffv/if_anyone_needs_regex_to_match_an_emote_mention/
		//Custom emojis doesn't work ATM.
		let roleNumberRegex = new RegExp('<@!*&*[0-9]+>', 'g');
		let customEmojiRegex = new RegExp(':[^:s]*(?:::[^:s]*)*:', 'g');
		for(let i = 0; i < oldFields.length; i++){

			let emojiname = oldFields[i].value.match(customEmojiRegex);

			//Unicode emoji
			if(reaction._emoji.name === oldFields[i].value.split(':')[0]){
				let roleId = oldFields[i].value.match(roleNumberRegex);
				let roleNumber = roleId[0].substring(3, roleId[0].length - 1);
				member.roles.add(roleNumber);
				let roleName = await reaction.message.guild.roles.fetch(roleNumber).then(role => role.name);
				member.send(`You now have the role of "${roleName}."`);
				return;
			}
			
			//Custom emoji
			if(emojiname){
				if(reaction._emoji.name === emojiname[0].substring(1, emojiname[0].length - 1)){
					let roleId = oldFields[i].value.match(roleNumberRegex);
					let roleNumber = roleId[0].substring(3, roleId[0].length - 1);
					member.roles.add(roleNumber);
					let roleName = await reaction.message.guild.roles.fetch(roleNumber).then(role => role.name);
					member.send(`You now have the role of "${roleName}."`);
					return;
				}
			}

		}
	},
};