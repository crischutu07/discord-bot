const { Events } = require("discord.js");
module.exports = {
  name: Events.InteractionCreate,
  label: "InteractionCreate",
  once: false,
  async execute(interaction, log) {
    log.label = this.label
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    log.debug(`${interaction.user.username} Issued the command: ${interaction.commandName}`);
    if (!command) {
      interaction.reply("That command is disabled.")
      log.error(`[${interaction.user.username}]No command matching ${interaction.commandName} was found.`);
      return;
    } // TODO: Add check interaction's interactionCreate same as the server's interactionCreate in config file

    try {
      await command.execute(interaction, log);
    } catch (error) {
      log.error(error);
      console.error(error.stack);
      if (interaction.replied || interaction.deferred) {
        interaction.reply({ content: "There's something wrong while executing this command.", ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};
