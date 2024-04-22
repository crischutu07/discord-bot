const { CommandInteraction } = require("discord.js");

module.exports = {
  disabled: false,
  data: {
    name: "ping",
    description: "Replies with Pong!",
    required: true,
  },
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    await interaction.reply(`Pong! ${ping}ms.\n` +
      `*Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>*`)
  },
};
