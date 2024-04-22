const { CommandInteraction, PermissionsBitField } = require('discord.js');
const process = require('node:child_process');
const child_process = require("node:child_process");
module.exports = {
  data: {
    name: "restart",
    description: "Restart the bot",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    options: [
      {
        name: "stop",
        description: "Stop the bot",
        type: 5,
      }
    ]
  },
  /**
   *
   * @param {CommandInteraction} interaction
   */
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