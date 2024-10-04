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
    const sent = await interaction.reply({ content: "Pinging..", ephemeral: true, fetchReply: true });
    if (!interaction.client.ws.ping === -1)
      interaction.editReply({ content: "Pong!\n" +
        `Websocket: \`${interaction.client.ws.ping}ms\`\n` +
        `API (Bot => Discord API): \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n` +
        `-# Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>`, ephemeral: true })
    else
      interaction.editReply({ content: "Pong!\n" +
            `Websocket: \`${interaction.client.ws.ping}ms\` *(This bot is fired up after somewhere 15 seconds ago)*\n` +
            `API (Bot => Discord API): \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n` +
            `-# Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>`, ephemeral: true })
  },
};
