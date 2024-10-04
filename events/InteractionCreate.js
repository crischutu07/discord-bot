const { Events } = require("discord.js");
const chalk = require('chalk')
module.exports = {
  name: Events.InteractionCreate,
  label: "InteractionCreate",
  once: false,
  async execute(interaction, log) {
    log.label = this.label
    // if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      interaction.reply("Command is not available.")
      log.error(`[${interaction.user.username}] No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      if (interaction.isAutocomplete())
        try {
          await command.autocomplete(interaction, log, chalk);
        } catch { return }
      else
        await command.execute(interaction, log, chalk);
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
