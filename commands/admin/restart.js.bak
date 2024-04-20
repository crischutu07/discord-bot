const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
// const process = require('node:child_process');
// const child_process = require("node:child_process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Restart the bot")
    .addBooleanOption(option =>
      option.setName("stop")
        .setDescription("Stops the bot")
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  async execute(interaction) {
    // child_process.execute(interaction);
    const stop = interaction.options.getBoolean("stop")
    if (stop === true){
      // child_process.exec(``)
      console.log(true)
    }
    interaction.reply(`${__dirname}`);
  }
}