const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  disabled: false,
  data: {
    name: "say",
    description: "Says a thing to he bot",
    options: [
      {
        name: "message",
        description: "Type a string of text to say something",
        type: 3,
        required: true
      }
    ],
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction, log) {
    const str = interaction.options.getString('message');
    interaction.reply(str)
    log.debug(`Contents of message: ${str}`)
  }
}
