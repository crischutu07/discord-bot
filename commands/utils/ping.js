const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: {
    name: "ping",
    description: "Replies with Pong!",
    required: true,
    dm_permissions: true,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    await interaction.reply(`Pong! ${interaction.client.ws.ping}ms.\n` + `*Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>*`)
  },
};
