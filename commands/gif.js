const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
require('dotenv').config();

const fetchGif = async (query) => {
    const response = await axios.get(`https://tenor.googleapis.com/v2/search?key=${process.env.tenorKey}&client_key=${process.env.clientId}&q=${query}&media_filter=gif&limit=5`);
    const randomIndex = Math.floor(Math.random() * response.data.results.length);
    return response.data.results[randomIndex].url;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Replies with a gif!')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('Find a Gif')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options._hoistedOptions[0].value;
        interaction.reply(await fetchGif(input));
    }
};