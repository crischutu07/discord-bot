const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  disabled: false,
  data: new SlashCommandBuilder()
    .setName("permlist")
    .setDescription("Check user's usable permissions")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    .addUserOption(option =>
      option.setName("user")
        .setDescription('The user you want to check')),
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
