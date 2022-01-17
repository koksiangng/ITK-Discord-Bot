//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const roleCommand = require(`../commands/role.js`)
const config = require(`../config.json`)

//Reaction add
//In order: Marine, VG, MTG, F&B, Programming, M&T, PR, TT.
//reactions = ['💚','🎮','🎴','🥧','💻','🎥','📯','🎲'];

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user) {
		//If the reactor is the bot - return
		let clientId = config.clientId;
		if(user.id === clientId) return;
		//Get the reactions and channelId and available roles.
		let reactions = roleCommand.reactions;
		let channelId = config.roleChannelId;
		let openRoles = config.openRoles;
		//If the reaction not part of the role-reactions, remove reaction and return.
		if(!reactions.includes(reaction.emoji.name)){
			reaction.users.remove(user).catch(e => console.error(e));
			return;
		}
		
        // Gets all roles
        let rolemapName = await reaction.message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.name).join(",");
		let rolemapNamelist;

		if (!rolemapName) console.log("No roles");
		else{
			rolemapNamelist = rolemapName.split(",");
		}

		//Filter out relevant roles from all roles.
		var relevant_roles_name = [];
		for(let i = 0; i < openRoles.length; i++){
			if (rolemapNamelist.includes(openRoles[i])){
				relevant_roles_name.push(openRoles[i]);
			}
		}

		//Find the member of reacted to the message.
		const m = reaction.message.guild.members.cache.find(member => member.id === user.id);

		//If the reaction was in the correct channel..
		//If there is a new role, add new case for it.
		if(channelId === reaction.message.channelId){
			let givenrole;
			let cache = reaction.message.guild.roles.cache;
			//Depending on the reaction, set the role. The order of the reactions can be seen in 'role.js'

			switch(reaction.emoji.name){
				//ADD NEW CASE BELOW
				case reactions[0]: givenrole = cache.find(role => role.name === relevant_roles_name[0]); break;
				case reactions[1]: givenrole = cache.find(role => role.name === relevant_roles_name[1]); break;
				case reactions[2]: givenrole = cache.find(role => role.name === relevant_roles_name[2]); break;
				case reactions[3]: givenrole = cache.find(role => role.name === relevant_roles_name[3]); break;
				case reactions[4]: givenrole = cache.find(role => role.name === relevant_roles_name[4]); break;
				case reactions[5]: givenrole = cache.find(role => role.name === relevant_roles_name[5]); break;
				case reactions[6]: givenrole = cache.find(role => role.name === relevant_roles_name[6]); break;
				case reactions[7]: givenrole = cache.find(role => role.name === relevant_roles_name[7]); break;
			}

			m.roles.add(givenrole);
			m.send(`You now have the role of "${givenrole.name}."`);
		}
	},
};