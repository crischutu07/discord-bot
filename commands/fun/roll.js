const { SlashCommandBuilder } = require("discord.js");
const crypto = require('crypto')
module.exports = {
  disabled: false,
  data: {
    name: "flipcoin",
    description: "Flip a coin.",
    required: true,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction, log) {
    const coin = crypto.randomInt(2) ? true : false
    if (coin){
      interaction.reply(`You flipped **Heads.**`)  
      log.debug(`${interaction.user.username} Flipped heads.`)
    } else {
      interaction.reply(`You flipped **Tails.**`)
      log.debug(`${interaction.user.username} Flipped tails.`)
    }
  },
};
