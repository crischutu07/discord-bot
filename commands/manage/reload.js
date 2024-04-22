const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
// TODO: Add reload global
module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The command to reload.')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  async execute(interaction) {
    const commandName = interaction.options.getString('command', true).toLowerCase();
    const command = interaction.client.commands.get(commandName);
    console.log(command)
    if (!command) { // TODO: Add reload global (here)
      return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try { // TODO: Add reload global (try method)
      interaction.client.commands.delete(command.data.name);
      const newCommand = require(`./${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
    }

  },
};
