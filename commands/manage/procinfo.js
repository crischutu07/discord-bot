const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const os = require("os");
module.exports = {
  disabled: false,
  data: {
    name: "procinfo",
    description: "Current bot's process information",
    default_member_permissions: PermissionFlagsBits.Administrator,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    function uptime(uptime){
      const date = new Date(uptime*1000);
      const days = date.getUTCDate() - 1,
        hours = date.getUTCHours(),
        minutes = date.getUTCMinutes(),
        seconds = date.getUTCSeconds();

      let segments = [];

      if (days > 0) segments.push(days + ' day' + ((days === 1) ? '' : 's'));
      if (hours > 0) segments.push(hours + ' hour' + ((hours === 1) ? '' : 's'));
      if (minutes > 0) segments.push(minutes + ' minute' + ((minutes === 1) ? '' : 's'));
      if (seconds > 0) segments.push(seconds + ' second' + ((seconds === 1) ? '' : 's'));
      return segments.join(', ');
    }
    await interaction.reply("\`\`\`" +
      `OS (Operating System): ${os.version} (${os.type()} ${os.arch()})\n` +
      `Uptime (Bot): ${uptime(process.uptime())}\n` +
      `Uptime (System): ${uptime(os.uptime())}\n` +
      `Node.js Version: ${process.version}\n` +
      "`\`\`"
    )
  }
}
