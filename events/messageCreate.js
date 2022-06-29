//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const secret = require('../secret.json');

//On message create
//message id length: 18
//Point is to have <emoji>: <role> | (description structure?)

//https://discordjs.guide/popular-topics/embeds.html#resending-and-editing
//Editing seems to not update the cache, which we will possibly need to remember who reacted to who on add role.
//So editing the embed might require a whole new embed, if we use embed.

//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md
//For how emoji works.

//Example usage:
//Adds the @Marine with the emoji 🎥 to the messageid 9937102975174869042
//!addrole 937102975174869042🎥 @Marine
// alternatively, if you have the commend id already (e.g. in config)
//!addrole 🎥 @Marine
module.exports = {
	name: 'messageCreate',
	async execute(message) {
		//msg, oldDescription and oldFields used for !addrole and !removerole
		var msg;
		var oldDescription;
		var oldFields;

		//For add role
		if(message.content.startsWith("!addrole")){

			//Extracts the messageId in the message content.
			//For some reason /d doesn't work. (returns null)
			//let regexMessageId = new RegExp('[0-9]{18}', 'g');
			//let messageId = message.content.match(regexMessageId);
			let messageId = secret.roleCommentId;

			//Regex for matching all emojis:
			//https://stackoverflow.com/questions/64509631/is-there-a-regex-to-match-all-unicode-emojis
			//Custom emojis: <:emoji_name:ID:>
			let r1 = "(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])";
			//Regex for custom emojis. (Concat the regex causes problems, or I'm just bad (likely the latter))
			let r2 = "(:[^:s]+:|<:[^:s]+:[0-9]+>|<a:[^:s]+:[0-9]+>)";
			//Regex for animated emojis.
			//let r3 = "(?<=<a?:.*:)\d*(?=>)";
			let regexEmoji = new RegExp(r1, 'g');
			let customEmoji = new RegExp(r2, 'g');
			//let animatedEmoji = new RegExp
			let emojiReaction; 
			emojiReaction = message.content.match(regexEmoji);

			//If null, it means that the message contains a custom emoji
			if(emojiReaction === null){
				emojiReaction = message.content.match(customEmoji);
			}

			//Regex for mention:
			//https://www.reddit.com/r/Discord_Bots/comments/iicffv/if_anyone_needs_regex_to_match_an_emote_mention/
			let regexRoleMention = new RegExp('<@!*&*[0-9]+>', 'g');
			let roleMention = message.content.match(regexRoleMention);

			//Temp solution for animated and custom emojis
			if(emojiReaction === null){
				message.channel.send("Invalid emoji. I'm currently only supporting non-custom emojis 😅. Blame the dev(s).")
				return;
			}
			
			//If there is no info given, return			
			if(messageId === null || roleMention === null){
				message.channel.send("I need more information! Either the message id is missing or the role I'm supposed to add is missing!")
				return;
			}

			//Get the role message
			if(Array.isArray(messageId)){
				msg = await message.channel.messages.fetch(messageId[0]);
			} else {
				msg = await message.channel.messages.fetch(messageId);
			}
				

			//Get the title and the description of the embed
			const oldTitle = msg.embeds[0].title;
			oldDescription = msg.embeds[0].description;
			if (msg.embeds[0].fields != null){
				oldFields = msg.embeds[0].fields;
			}

			//Cannot add the same role again.
			let roleNumberRegex = new RegExp('<@!*&*[0-9]+>', 'g');
			let customEmojiRegex = new RegExp(':[^:s]*(?:::[^:s]*)*:', 'g');
			for(let i = 0; i < oldFields.length; i++){
				
				let emojiname = oldFields[i].value.match(customEmojiRegex);

				//Checks the role if it has been added already
				console.log(roleMention[0]);
				if(roleMention[0] === oldFields[i].value.match(roleNumberRegex)[0]){
					message.channel.send("The role " + roleMention[0] + " is taken");
					return
				}


				//Checks the emoji (unicode) if it has been added already
				if(emojiReaction[0] === oldFields[i].value.split(':')[0]){
					message.channel.send("The emoji " + emojiReaction[0] + " is taken");
					return
				}

				//Checks the emoji (custom) if it has been added already
				if(emojiname){
					if(emojiReaction[0].substring(1, emojiname[0].length + 1) === emojiname[0]){
						message.channel.send("The emoji is taken");
						return
					}
				}
				
			}

			//Creating a new embed
			//\u200b = blank space
			const newEmbed = new MessageEmbed()
			.setColor(config.NATgreen)
			.setTitle(oldTitle)
			.setDescription(oldDescription)
			.addFields(oldFields)
			//.addField(emojiReaction[0], roleMention[0])
			.addField("\u200b", emojiReaction[0] + ":" + roleMention[0])
			;
			
			//Editing the embed
			const m = await msg.edit({embeds:[newEmbed]})

			//Sending messages in the channel.
			message.channel.send("Adding emoji: " + emojiReaction[0]);
			message.channel.send("Adding role: " + roleMention[0]);
			message.channel.send("Reacting with the emoji: " + emojiReaction[0]);

			//React with the added emoji
			m.react(emojiReaction[0]);
        }
		//For remove role.
		if(message.content.startsWith("!removerole")){

			//Extracts the messageId in the message content.
			//For some reason /d doesn't work. (returns null)
			//let regexMessageId = new RegExp('[0-9]{18}', 'g');
			//let messageId = message.content.match(regexMessageId);
			let messageId = secret.roleCommentId;

			//Regex for mention:
			//https://www.reddit.com/r/Discord_Bots/comments/iicffv/if_anyone_needs_regex_to_match_an_emote_mention/
			let regexRoleMention = new RegExp('<@!*&*[0-9]+>', 'g');
			let roleMention = message.content.match(regexRoleMention);

			//Get the role message
			if(Array.isArray(messageId)){
				msg = await message.channel.messages.fetch(messageId[0]);
			} else {
				msg = await message.channel.messages.fetch(messageId);
			}
				
			//Get the title and the description of the embed
			const oldTitle = msg.embeds[0].title;
			oldDescription = msg.embeds[0].description;
			if (msg.embeds[0].fields != null){
				oldFields = msg.embeds[0].fields;
			}

			//Emoji to remove from the message
			var emoji;

			//Removing the role from the field.
			for(let i = 0; i < oldFields.length; i++){
				
				if(roleMention[0] === oldFields[i].value.split(':')[1]){
					emoji = oldFields[i].value.split(':')[0];
					oldFields.splice(i, 1);
				}
				
			}

			//Creating a new embed
			const newEmbed = new MessageEmbed()
			.setColor(config.NATgreen)
			.setTitle(oldTitle)
			.setDescription(oldDescription)
			.addFields(oldFields)
			;
			
			//Editing the embed
			const m = await msg.edit({embeds:[newEmbed]})
			
			//If the emoji is not in the reactions...
			if(!m.reactions.cache.get(emoji)){
				message.channel.send("The role is not available in the embed!");
				return;
			}
			//Removing the emoji
			m.reactions.cache.get(emoji).remove()
				.catch(error => console.error('Failed to remove reactions:', error));
		}
	},
};
