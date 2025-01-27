const { Events } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  name: Events.InteractionCreate,
  label: "ModalSubmit",
  once: false,
  /**
   *
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction, log, chalk) {
    if (!interaction.isModalSubmit()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    modal = await command.handleModal(interaction, log, chalk);
  },
};
