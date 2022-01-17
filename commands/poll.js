//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

//https://discordjs.guide/interactions/registering-slash-commands.html#options
//Options

// Polling system where the voters can only vote once.
// They are DMed what they voted, and if they try again,
// they will be DMed that they can't vote again.
// The pollmaker will receive the result in the form of a DM.
// Setting up requires:
// /poll
// 1. Name of the poll (String)
// 2. Amount of options (Int)
// 3. How long the poll is up (Int)

//First one is: \u0031\u20E3... \u0039\u20E3
var reaction_numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
var active_reactions = [];
//Currently 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sets up a poll with desired amount of voting choices (max 9)')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Set the poll name')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('poll')
            .setDescription('Enter amount of options (max 9)')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('time')
            .setDescription('Enter the amount of time in minutes')
            .setRequired(false))
        ,
	async execute(interaction) {
        var reacted = []; //To keep track of unique voters.
        var result; //Stores the vote to later send to pollmaker.
        //Get the values
        const pollname = interaction.options.getString('name');
        const amount = interaction.options.getInteger('poll');
        //const t = interaction.options.getInteger('time') * 5000; // For testing
        const t = interaction.options.getInteger('time') * 1000 * 60; // => to 1 sec => to 1 min 

        //Post msg
        const msg = await interaction.reply({ content: `React to poll "${pollname}" by voting:`, fetchReply: true});

        //Add the reactions to post
        let valid_reactions = []
        for(let i = 0; i < amount; i++){
            msg.react(reaction_numbers[i]);
            valid_reactions.push(reaction_numbers[i]);
            active_reactions.push(reaction_numbers[i]);
        }
        result = new Array(active_reactions.length).fill(0);
        
        //includecheck: checks if relevant emoji has been reacted with
        //idcheck: checks that it's not the author (Nat)
        
        const filter = (reaction, user) => {
            //If the reactions are not valid (i.e. react to Nats options) -> remove them.
            if(!valid_reactions.includes(reaction.emoji.name)) reaction.users.remove(user).catch(e => console.error(e));
            const includecheck = active_reactions.includes(reaction.emoji.name);
            const idcheck = user.id !== msg.author.id;
            return includecheck && idcheck;
        };
    
        //Create collector with filter and time
        //Can set max: 1 to vote once, but then can't remove name on collect
        const collector = msg.createReactionCollector( { filter, time: t, dispose: true });

        //On collect - collect
        //People can vote anonymously (removes vote after voted)
        //People can only vote once. 
        //https://discord.js.org/#/docs/discord.js/stable/class/Collector?scrollTo=e-collect
        collector.on('collect', (reaction, user) => {
            reaction.users.remove(user).catch(e => console.error(e));

            if (!reacted.includes(user.id)){
                reacted.push(user.id);
                user.send(`You reacted to ${reaction.emoji.name} to the poll "${pollname}"`);

                switch(reaction.emoji.name){
                    case reaction_numbers[0]: result[0] = result[0] + 1; break;
                    case reaction_numbers[1]: result[1] = result[1] + 1; break;
                    case reaction_numbers[2]: result[2] = result[2] + 1; break;
                    case reaction_numbers[3]: result[3] = result[3] + 1; break;
                    case reaction_numbers[4]: result[4] = result[4] + 1; break;
                    case reaction_numbers[5]: result[5] = result[5] + 1; break;
                    case reaction_numbers[6]: result[6] = result[6] + 1; break;
                    case reaction_numbers[7]: result[7] = result[7] + 1; break;
                    case reaction_numbers[8]: result[8] = result[8] + 1; break;
                }

            } else {
                user.send(`You already voted!`);
            }
        });
        
        //On collect - end
        //Sends the final information to pollmaker.
        //https://discord.js.org/#/docs/discord.js/stable/class/Collector?scrollTo=e-collect
        collector.on('end', () => {
            var t = `Results from the poll ${pollname} are: \n`;
            for(var i = 0; i < result.length; i++){
                t = t.concat(`${result[i]} voted on ${reaction_numbers[i]}`)
                if(i == result.length - 1){
                    t = t.concat(".\n");
                } else {
                    t = t.concat(",\n");
                }
            }
            interaction.member.user.send(t);
        });
	},
};
