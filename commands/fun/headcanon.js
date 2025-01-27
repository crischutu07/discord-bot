const { Events } = require("discord.js");
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
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction){
    const headcanon = require("../../utils/headcanon.js");
    let name = interaction.options.getString('character');
    if (name.length > 32){
      return await interaction.reply("Character names must less than 32 character.")
    }
    let response = await headcanon(`__${name}__`)
    await interaction.reply(`Headcanon: ${response}`);
  }
}
