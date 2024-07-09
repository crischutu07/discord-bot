const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    disabled: false,
    data: {
        name: "membercount",
        description: "Shows amount of joined members in the server",
        required: true,
    },
    /**
     *
     * @param {SlashCommandBuilder} interaction
     */
    async execute(interaction) {
        const count = interaction.guild.memberCount;
        await interaction.reply(`There are currently ${count} members in this server.\n`);
    },
};
