const { SlashCommandBuilder } = require("discord.js");
const crypto = require('crypto')
module.exports = {
  disabled: false,
  data: {
    name: "flipcoin",
    description: "Flip a coin.",
    required: true,
    dm_permissions: true,
    contexts: [0, 1, 2],
    integration_types: [0, 1],
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   * @param log
   */
  async execute(interaction, log) {
    const coin = !!crypto.randomInt(2)
    if (coin){
      interaction.reply(`You flipped **Heads.**`)  
      log.debug(`${interaction.user.username} Flipped heads.`)
    } else {
      interaction.reply(`You flipped **Tails.**`)
      log.debug(`${interaction.user.username} Flipped tails.`)
    }
  },
};
