//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

//Role reaction
module.exports = {
	name: 'messageReactionAdd',
	execute(reaction, user) {
		console.log(`${reaction}`);
		console.log("heh, u stoopid");
        //let role = reaction.message.guild.roles.find(role => role.name === "Marine");
		let role = reaction.message.guild.roles.cache.find(role => role.name === "Marine");
		const g = reaction.message.guild;
		const m = g.members.cache.find(member => member.id === user.id);
		//m.addRole(role)
		m.roles.add(role);
	},
};