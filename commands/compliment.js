const { SlashCommandBuilder } = require('discord.js');

const compliments = [
    "You're not bad looking for a human.",
    "I can tell you're a true gamer.",
    "I really like your big brain!"
];

function generateRandomCompliment(compliments) {
    const index = Math.floor(Math.random() * compliments.length);
    return compliments[index];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('compliment')
		.setDescription('Replies with a compliment!'),
	async execute(interaction) {
		await interaction.reply(`Hi ${interaction.user.username}\n${generateRandomCompliment(compliments)}`);
	},
};