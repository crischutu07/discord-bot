const { CommandInteraction } = require('discord.js');

module.exports = {
  disabled: false,
  data: {
    name: "say",
    aliases: ["says", "said"],
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
   * @param {CommandInteraction} interactions
   */
  async execute(interactions) {
    const str = interactions.options.getString('strings');
    interactions.reply(`${str}`)
  }
}
