const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ComponentType, EmbedBuilder } = require('discord.js');

const row = new ActionRowBuilder;
row.addComponents(new ButtonBuilder()
    .setCustomId('Aram')
    .setLabel('Aram')
    .setStyle(ButtonStyle.Primary));

row.addComponents(new ButtonBuilder()
    .setCustomId('Normal')
    .setLabel('Normal')
    .setStyle(ButtonStyle.Primary));

row.addComponents(new ButtonBuilder()
    .setCustomId('Ranked')
    .setLabel('Ranked')
    .setStyle(ButtonStyle.Primary));

function userAlreadyVoted(votes, buttonInteraction) {
    return votes.some((user) => {
        return user.userId === buttonInteraction.user.id;
    });
}

function countVotes(gamemode, votes) {
    let counter = 0;
    for (let vote of votes) {
        if (vote.gamemode === gamemode) counter++;
    }
    return counter;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamemode')
        .setDescription("What should we play today?"),
    async execute(interaction) {
        await interaction.reply({ content: 'Which League gamemode should we play?', components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1000 * 15, max: 10 });
        const votes = [];

        collector.on('collect', buttonInteraction => {
            if (userAlreadyVoted(votes, buttonInteraction)) {
                buttonInteraction.reply({ content: 'You can only vote once', ephemeral: true });
                return;
            }
            votes.push({
                userId: buttonInteraction.user.id,
                gamemode: buttonInteraction.customId,
                username: buttonInteraction.user.username
            });
            buttonInteraction.reply({ content: 'Vote Successful', ephemeral: true });
        });

        collector.on('end', async () => {

            const resultsEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Results')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_vote.svg/1200px-Logo_vote.svg.png')
                .addFields({ name: '\u200B', value: '\u200B' },)
                .setTimestamp();

            for (let vote of votes) {
                resultsEmbed.addFields({ name: `${vote.username}`, value: `${vote.gamemode}` });
            }
            resultsEmbed.addFields(
                { name: '\u200B', value: '\u200B' },
                { name: "Aram Votes᲼᲼᲼᲼", value: `${countVotes('Aram', votes)}`, inline: true },
                { name: "Normal Votes᲼᲼᲼᲼", value: `${countVotes('Normal', votes)}`, inline: true },
                { name: "Ranked Votes᲼᲼᲼᲼", value: `${countVotes('Ranked', votes)}`, inline: true });

            await interaction.editReply({ components: [] });
            await interaction.followUp({ embeds: [resultsEmbed] });
        });
    },
};


