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
      await user.send(msg)
      return interaction.reply(`${user}! The interactor just told me to send something :3`)
      // return interaction.followUp(`Sent the message to **${member.user.username}**!\n\nContents: "${msg}"`)
    } catch {
      return interaction.reply(`${member.user.username} user is not enabled Direct Messages.`)
    }
  }
}