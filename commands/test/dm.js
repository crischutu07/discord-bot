const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Direct Message test')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to send DMs (default: Hello, World!)')),
  async execute(interaction) {
    const msg = interaction.options.getString('message') || "Hello, World!";
    interaction.reply(`Sent the message to **${interaction.user.username}**!\n\nContents: "${msg}"`)
    interaction.user.send(msg);
  }
}