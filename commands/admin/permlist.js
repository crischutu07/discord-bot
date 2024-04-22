const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  disabled: false,
  data: {
    name: "permlist",
    description: "Check user's usable permissions,",
    default_member_permissions: PermissionsBitField.Flags.ManageServer,
    options: [
      {
        name: "user",
        description: "The user you want to check their usable permissions",
        type: 6,
      },
    ]
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const memberPermissions = member.permissions.toArray().sort();
    interaction.reply({
      content: `\`\`\`js\n\/\/ List permissions for: ${user.username} (A-Z - JavaScript)\n${JSON.stringify(memberPermissions).replace(/,/g, ",\n")}\`\`\``,
      ephemeral: true
    })
  }
}
