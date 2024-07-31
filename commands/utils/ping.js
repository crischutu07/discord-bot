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
    const ping = interaction.client.ws.ping;
    await interaction.reply(`Pong! ${ping}ms.\n` +
      `*Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>*`)
  },
};
