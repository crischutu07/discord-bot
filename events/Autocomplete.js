const { Events } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  name: Events.InteractionCreate,
  label: "Autocomplete",
  once: false,
  /**
   *
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction, log, chalk) {
    if (!interaction.isAutocomplete()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    await command.autocomplete(interaction, log, chalk);
  },
};
