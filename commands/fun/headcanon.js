const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  disabled: false,
  data: {
    name: 'headcanon',
    description: "Generate headcanon for character.",
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    dm_permissions: true,
    required: true,
    options: [
      {
	name: 'character',
	description: 'Name of the character',
	type: 3,
	required: true
      }
    ]
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   * @param log
   */
  async execute(interaction){
    const headcanon = require("../../utils/headcanon.js");
    let response = await headcanon(`__${interaction.options.getString('character')}__`)
    await interaction.reply(response);
  }
}
