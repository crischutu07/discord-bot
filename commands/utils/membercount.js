const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    disabled: false,
    data: {
        name: "membercount",
        description: "Shows amount of joined members in the server",
    },
    /**
    * @param {SlashCommandBuilder} interaction
    */
    async execute(interaction) {
        await interaction.reply(`Member: ${interaction.guild.memberCount}`);
    },
};
