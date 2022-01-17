//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const roleCommand = require(`../commands/role.js`)
const messageReactionAdd = require(`./messageReactionAdd.js`)
const config = require(`../config.json`)

//Reaction remove
//In order: Marine, VG, MTG, F&B, Programming, M&T, PR, TT.
//reactions = ['💚','🎮','🎴','🥧','💻','🎥','📯','🎲'];
module.exports = {
	name: 'messageReactionRemove',
	async execute(reaction, user) {
		//If the reactor is the bot - return
		let clientId = config.clientId;
		if(user.id === clientId) return;
		//Get role-reactions and channelId
		let channelId = config.roleChannelId;
		let reactions = roleCommand.reactions;
		//If the reaction not part of the role-reactions, return.
		if(!reactions.includes(reaction.emoji.name)) return;
		
		// Gets all roles
		let rolemapName = await reaction.message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.name).join(",");
		let rolemapNamelist;

		if (!rolemapName) console.log("No roles");
		else{
			rolemapNamelist = rolemapName.split(",");
		}
		
		//Filter out relevant roles from all roles.
		let relevant_roles_name = [];
		let openRoles = config.openRoles;
		for(let i = 0; i < openRoles.length; i++){
			if (rolemapNamelist.includes(openRoles[i])){
				relevant_roles_name.push(openRoles[i]);
			}
		}

		//Find the member of reacted to the message.
		const m = reaction.message.guild.members.cache.find(member => member.id === user.id);

		//If the removed reaction was in the correct channel..
		//If there is a new role, add new case for it (removed).
		if(channelId === reaction.message.channelId){
			let removedrole;
			let cache = reaction.message.guild.roles.cache;
			//Depending on the reaction, set the role. The order of the reactions can be seen in 'role.js'

			switch(reaction.emoji.name){
				case reactions[0]: removedrole = cache.find(role => role.name === relevant_roles_name[0]); break;
				case reactions[1]: removedrole = cache.find(role => role.name === relevant_roles_name[1]); break;
				case reactions[2]: removedrole = cache.find(role => role.name === relevant_roles_name[2]); break;
				case reactions[3]: removedrole = cache.find(role => role.name === relevant_roles_name[3]); break;
			}

			m.roles.remove(removedrole);
			m.send(`You no longer have the role of "${removedrole.name}."`);
		}
		
	},
};