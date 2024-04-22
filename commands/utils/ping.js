const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .setDMPermission(true),
  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    await interaction.reply(`Pong! ${ping}ms.\n` +
      `*Sent the message at: <t:${(interaction.createdTimestamp / 1000).toFixed()}:F>*`)
  },
};
