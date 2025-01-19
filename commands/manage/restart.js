const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const child = require('child_process');
module.exports = {
  data: {
    name: "restart",
    description: "Restart the bot",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
      await interaction.reply("restarting...");
      child.exec("pm2 start npm -- start", (err) => {
        if(err) return console.error(err)
      })

  }

}
