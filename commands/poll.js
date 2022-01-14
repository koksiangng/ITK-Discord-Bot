//https://discordjs.guide/creating-your-bot/command-handling.html#individual-command-files
const { SlashCommandBuilder } = require('@discordjs/builders');

//https://discordjs.guide/interactions/registering-slash-commands.html#options
//Options
//First one is: \u0031\u20E3... \u0039\u20E3
var reaction_numbers = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
var active_reactions = [];
//Currently 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Sets up a poll with desired amount of voting choices (max 9)')
        //.addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true))
        .addIntegerOption(option => option
            .setName('poll')
            .setDescription('Enter amount of options (max 9)')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('time')
            .setDescription('Enter the amount of time in minutes')
            .setRequired(true))
        ,
	async execute(interaction) {

        //Get the values
        const amount = interaction.options.getInteger('poll');
        const t = interaction.options.getInteger('time') * 1000 * 60; // => to 1 sec => to 1 min 

        //Post msg
        const msg = await interaction.reply({ content: 'React to vote', fetchReply: true});

        //Add the reactions to post
        for(let i = 0; i < amount; i++){
            msg.react(reaction_numbers[i]);
            active_reactions.push(reaction_numbers[i]);
        }
        
        //Only get reactions part of the original reactions by Nat and no reaction by Nat.
        const filter = (reaction, user) => {
            const includecheck = active_reactions.includes(reaction.emoji.name);
            const idcheck = user.id !== msg.author.id;
            return includecheck && idcheck;
        };
    
        //Create collector with filter and time
        const collector = msg.createReactionCollector({ filter, time: t });
        
        //On collect - collect
        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        //On collect - end
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
        
        /*
        msg.awaitReactions( {time: t, errors: ['time'] })
        .then(collected => console.log(collected.size))
        .catch(collected => {
            console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        });
        */
        
        /*
        msg.react('👍').then(() => msg.react('👎'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.user.id;
        };
        
        msg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '👍') {
                    msg.reply('You reacted with a thumbs up.');
                } else {
                    msg.reply('You reacted with a thumbs down.');
                }
            })
            .catch(collected => {
                msg.reply('You reacted with neither a thumbs up, nor a thumbs down.');
            });
        
        */
        
        /*
        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
        */

        //msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));


        
        //https://stackoverflow.com/questions/65604549/discordjs-bot-is-not-removing-users-reaction-in-a-dm
	},
};
