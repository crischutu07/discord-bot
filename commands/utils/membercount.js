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
        await interaction.reply(`There are currently ${interaction.guild.memberCount} members in this server.\n`);
    },
};
