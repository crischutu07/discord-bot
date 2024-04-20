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
      console.error(`[${interaction.user.username}]No command matching ${interaction.commandName} was found.`);
      return;
    } // TODO: Add check interaction's interactionCreate same as the server's interactionCreate in config file

    try {
      await command.execute(interaction, log);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        const channel = interaction.client.channels.cache.get('1228692306987585577');
        await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        channel.send(`${interaction.user.username}, issued the command: ${interaction.command.name}\nError: \`\`\`${error}\`\`\``);
      } else {
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
      }
    }
  }
};
