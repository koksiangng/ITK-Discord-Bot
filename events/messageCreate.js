//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

//On message create
//role message id 936989066115829822
//message id length: 18
//Point is to have <emoji>: <role> | (description structure?)

//https://discordjs.guide/popular-topics/embeds.html#resending-and-editing
//Editing seems to not update the cache, which we will possibly need to remember who reacted to who on add role.
//So editing the embed might require a whole new embed, if we use embed.

//https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/using-emojis.md
//For how emoji works.

//names need to be all lower case - Discord API
//role message id 936989066115829822

//Example usage:
//Adds the @Marine with the emoji 🎥 to the message 9937102975174869042
//!addrole 937102975174869042🎥 @Marine
module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if(message.content.startsWith("!addrole")){

			//Extracts the messageId in the message content.
			//For some reason /d doesn't work. (returns null)
			let regexMessageId = new RegExp('[0-9]{18}', 'g');
			let messageId = message.content.match(regexMessageId);

			//Regex for matching all emojis:
			//https://stackoverflow.com/questions/64509631/is-there-a-regex-to-match-all-unicode-emojis
			let regexEmoji = new RegExp('(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])', 'g')
			let emojiReaction = message.content.match(regexEmoji);

			//Regex for mention:
			//https://www.reddit.com/r/Discord_Bots/comments/iicffv/if_anyone_needs_regex_to_match_an_emote_mention/
			let regexRoleMention = new RegExp('<@!*&*[0-9]+>', 'g');
			let roleMention = message.content.match(regexRoleMention);

			//Get the role message
			const msg = await message.channel.messages.fetch(messageId[0]);

			//Get the title and the description of the embed
			const oldTitle = msg.embeds[0].title;
			var oldDescription = msg.embeds[0].description;

			//Concatenating new emoji and new role
			oldDescription = oldDescription.concat("\n", emojiReaction[0], ":", roleMention[0], "\n");

			//Creating a new embed
			const newEmbed = new MessageEmbed()
			.setColor(config.NATgreen)
			.setTitle(oldTitle)
			.setDescription(oldDescription)
			;
			
			//Editing the embed
			const m = await msg.edit({embeds:[newEmbed]})

			message.channel.send("Adding emoji: " + emojiReaction[0]);
			message.channel.send("Adding role: " + roleMention[0]);
			message.channel.send("Reacting with the emoji: " + emojiReaction[0]);

			//React with the added emoji
			m.react(emojiReaction[0]);
        }

		else{
			//message.channel.send("pong!");
			/*
		    message.reply({
			    content: 'pong!'
		    })
			*/
		}
	},
};
