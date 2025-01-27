const { Events } = require("discord.js");

module.exports = {
  data: {
    name: "money2times",
    description: "Exchange money to times.",
    contexts: [0,1,2],
    integration_types: [0,1],
    dm_permissions: true,
    options: [
      {
	name: 'rate',
	description: "Amount of money is wasted per hour.",
	required: true,
	type: 4
      },
      {
	name: 'money',
	description: 'Amount of money you have',
	required: true,
	type: 4
      }
    ]
  },
  /**
   * @param {Events.InteractionCreate} interaction
   */
  async execute(interaction) {
    const rate = interaction.options.getInteger('rate');
    const money = interaction.options.getInteger('money');

    const totalHours = parseFloat(money) / parseFloat(rate);

    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const seconds = Math.floor(((totalHours - hours) * 60 - minutes) * 60);

    await interaction.reply(
      `Rate: ${rate} per hour\n` +
      `Money: ${money}\n` +
      `Total: ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`
    )
  }
}
