const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Direct Message test')
    .addUserOption(option => option.setName('user')
      .setDescription('User to send a Direct Messages'))
    .addStringOption(option => option.setName('message')
      .setDescription('Message to send DMs (default: Hello, World!)')),
  async execute (interaction) {
    const msg = interaction.options.getString('message') || "Hello, World!";
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id)
    try { // TODO: fix catching wrong error
      await interaction.reply(`${member.user.username} user is not enabled Direct Messages.`)
    } catch {
      await interaction.reply(`Sent the message to **${member.user.username}**!\n\nContents: "${msg}"`)
    }
  }
}