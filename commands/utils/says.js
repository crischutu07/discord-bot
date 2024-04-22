const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Says a thing to he bot')
    .addStringOption(option =>
      option.setName('strings')
        .setDescription("Type a string of text to say something").setRequired(true)),
  async execute(interactions) {
    const str = interactions.options.getString('strings');
    interactions.reply(str)
  }
}
