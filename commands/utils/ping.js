const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: {
    name: "ping",
    description: "Replies with Pong!",
    contexts: [0,1,2],
    integration_types: [0,1],
    required: true,
    dm_permissions: true,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    const sent = await interaction.reply({ content: "Pinging..", ephemeral: true, fetchReply: true })
    interaction.editReply({ content: "Pong!\n" + 
      `Websocket: \`${interaction.client.ws.ping}ms\`\n` + 
      `Roundtrip Latency: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n` +
      `-# Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>`, ephemeral: true })
  },
};
