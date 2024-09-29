const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const process = require('node:child_process');
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
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    const stop = interaction.options.getBoolean("stop")
    interaction.reply(`Killing myself... (${process.pid})`)
    if (stop === true){
      process.kill(process.pid)
    }
  }

}
