const { Events, PermissionsBitField } = require('discord.js');
// TODO: Add reload global
module.exports = {
  disabled: true,
  data: {
    name: "reload",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    description: "Reload a command.",
    option: [
      {
        name: "command",
        required: true,
        description: "The command to reload",
        type: 6
      }
    ]
  },
  /**
   *
   * @param {Events.InteractionCreate} interaction
   */
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);
    console.log(command)
    if (!command) { // TODO: Add reload global (here)
      return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try { // TODO: Add reload global (try method)
      await interaction.client.commands.delete(command.data.name);
      const newCommand = require(`./${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
    }

  },
};
