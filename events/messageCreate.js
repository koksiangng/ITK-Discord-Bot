//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//On message create
//role message id 936989066115829822
//message id length: 18
//Point is to have <emoji>: <role> | (description structure?)
module.exports = {
	name: 'messageCreate',
	execute(message) {
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


			
			//message.channel.send(emojiReaction[0]);
			message.channel.send(roleMention[0]);
			const msg = message.channel.messages.fetch(messageId[0]);
			console.log(msg);
			console.log("msg.content");
			console.log(msg.content);
	
			//await interaction.reply(t);
            //message.channel.send("pong!");
			/*
		    message.reply({
			    content: 'pong!'
		    })
			*/
        }
	},
};
