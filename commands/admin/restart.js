const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const process = require('node:child_process');
const child_process = require("node:child_process");
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
    const stop = interaction.options.getBoolean("stop")
    if (stop === true){
      child_process.exec("taskkill /IM /F node.exe")
      child_process.exec(`C:\\Program Files\\nodejs\\npm.cmd run start`)
      console.log(true)
    }
    child_process.exec("taskkill /IM /F node.exe", (error, _ignore, stderr) => {
      if (error || stderr) console.error(`${error || stderr}`);
    });
    interaction.reply(`${__dirname}`);
  }

}