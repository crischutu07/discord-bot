const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: {
    name: "ping",
    description: "Replies with Pong!",
    contexts: [0,1,2],
    integration_types: [0,1],
    dm_permissions: true,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Ping..\n" +
        `Websocket: \`${interaction.client.ws.ping}ms\`\n` +
        `-# Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>`,
      ephemeral: true,
      fetchReply: true
    });
    interaction.editReply({
      content: "Pong!\n" +
        `Websocket: \`${interaction.client.ws.ping}ms\`\n` +
        `API (Bot => Discord API): \`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n` +
        `-# Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>`,
      ephemeral: true
    })
  },
};
