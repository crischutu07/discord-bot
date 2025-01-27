const { Events } = require("discord.js");
module.exports = {
  disabled: false,
  data: {
    name: "roll",
    description: "Roll the dice.",
    contexts: [0,1,2],
    integration_types: [0,1],
    dm_permissions: true,
    options: [
      {
        name: "side",
        description: "Number of the sides on the dices. (Default is: 1)",
        type: 4
      }
    ]
  },
  /**
   *
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction, log) {
    const { randomInt } = require("crypto")
    let side = interaction.options.getInteger("side") || 1;
    let num = 0;
    for (let i = 0; i < side; i++)
      num+= randomInt(1,6)

    log.debug(`${interaction.user.username} Rolled ${num} (${side} Sides)`)
    if (side === 1)
      interaction.reply(`You rolled a one-sided dice and got: ${num}`)
    else
      interaction.reply(`You rolled a ${side}-sided dice and got: ${num}`)
  },
};
