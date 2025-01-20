const { Events } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  name: Events.InteractionCreate,
  label: "InteractionCreate",
  once: false,
  async execute(interaction, log) {
    log.label = this.label
    let modal;
    // if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      interaction.reply({
	content: "Command is not available.",
	ephemeral: true
      })
      log.error(`[${interaction.user.username}] No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      if (interaction.isAutocomplete())
          await command.autocomplete(interaction, log, chalk);
      else if (interaction.isModalSubmit())
          modal = await command.handleModal(interaction, log, chalk)
      else if ('execute' in command)
        await command.execute(interaction, log, chalk, modal);
      log.info(`${interaction.user.username} Issued: ${interaction.commandName}`)
    } catch (error) {
      log.error(error);
      console.error(error.stack);
      if (interaction.replied || interaction.deferred) {
        interaction.reply({ content: "There's something wrong while executing this command.", ephemeral: true });
        return;
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        return;
      }
    }
    log.setLabel()
  }
};
