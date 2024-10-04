const { SlashCommandBuilder } = require("discord.js");
const crypto = require('crypto')
module.exports = {
    disabled: false,
    data: {
        name: "roulette",
        description: "Play a game of Russian Roulette!",
        required: true,
        contexts: [0, 1, 2],
        dm_permissions: true,
        integration_types: [0, 1],
    },
    /**
     * @param {SlashCommandBuilder} interaction
     */
    async execute(interaction) {
        const coin = !!crypto.randomInt(2);
        if (coin)
            interaction.reply('Click! The guns fired and shoots at you.')
        else
            interaction.reply("Click! You're safe!")
    },
};
