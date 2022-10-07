const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: secretSantaCommand(),
    execute
};

async function execute(interaction) {
    if (invalidUser(interaction)) return;

    const participants = createParticipantList(interaction.options._hoistedOptions);
    shuffleArray(participants);

    const santasList = createSantaList(participants);
    const santasListEmbed = buildListEmbed();

    for (const santa of santasList) {
        let directMsgEmbed = buildDirectMsgEmbed();
        directMsgEmbed.addFields({ name: `Hi Secret Santa`, value: `This Christmas you'll be provding ${santa.receiver.username} with the gift of love 🎁` });
        santa.giver.send({ embeds: [directMsgEmbed] });

        santasListEmbed.addFields({ name: `Santa: ${santa.giver.username}`, value: `Recipient: ${santa.receiver.username}` });
    }

    interaction.user.send({ embeds: [santasListEmbed] });
    interaction.reply('Operations were successful');
}

function secretSantaCommand() {
    const santaCommand = new SlashCommandBuilder()
        .setName('secret-santa')
        .setDescription('Sets up Secret Santa');

    addOptions(santaCommand);
    return santaCommand;
}

function invalidUser(interaction) {
    return interaction.user.username === 'Jalen.H' ? false : true;
}

function createParticipantList(options) {
    const participants = [];
    for (const option of options) {
        participants.push(option.user);
    }
    return participants;
}

function createSantaList(participants) {
    const santaList = participants.map((participant, i) => {
        return i < participants.length - 1 ? { giver: participant, receiver: participants[i + 1] } : { giver: participant, receiver: participants[0] };
    });
    return santaList;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function buildListEmbed() {
    const santasListEmbed = new EmbedBuilder()
        .setColor(0x00873E)
        .setTitle('Secret Santa Full Results')
        .setThumbnail('https://www.pngitem.com/pimgs/m/632-6322027_anime-christmas-png-transparent-png.png')
        .addFields({ name: '\u200B', value: '\u200B' },)
        .setTimestamp();
    return santasListEmbed;
}

function buildDirectMsgEmbed() {
    const directMsgEmbed = new EmbedBuilder()
        .setColor(0x00873E)
        .setTitle('XL Secret Santa')
        .setThumbnail('https://www.pngitem.com/pimgs/m/632-6322027_anime-christmas-png-transparent-png.png')
        .addFields({ name: '\u200B', value: '\u200B' },)
        .setTimestamp();
    return directMsgEmbed;
}

function addOptions(santaCommand) {
    santaCommand
        .addUserOption(option =>
            option.setName(`santa-1`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-2`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-3`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-4`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-5`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-6`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-7`)
                .setDescription('Input user')
                .setRequired(true))
        .addUserOption(option =>
            option.setName(`santa-8`)
                .setDescription('Input user')
                .setRequired(true));
}

