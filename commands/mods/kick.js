const { CommandInteraction, PermissionsBitField } = require('discord.js');
module.exports = {
  disabled: false,
  data: {
    name: "kick",
    description: "Kick a user from the server.",
    default_member_permissions: PermissionsBitField.Flags.KickMembers,
    options: [
      {
        name: "user",
        description: "User you want to kick",
        required: true,
        type: 6,
      },
      {
        name: "reason",
        description: "The user you want to kick,",
        type: 3,
      }
    ]
  },
  /**
   *
   * @param {CommandInteraction} interactions
   *
   */
  async execute(interactions) {
    const user = interactions.options.getUser('user');
    const reason = interactions.options.getString('reason') || 'No reason provided.';
    const member = interactions.guild.members.cache.get(user.id);
    if (!member) {
      return interactions.reply({ content: 'That user is not in this server.', ephemeral: true });
    }
    if (!member.kickable) {
      return interactions.reply({ content: 'I cannot kick that user.', ephemeral: true });
    }
    try {
      await member.send(`You're been kicked from **crischutu07's Server** Reason: ${reason}`)
      await member.kick(reason);
      return interactions.reply({ content: `Successfully kicked ${user.username} for reason: ${reason} (Recieved DMs)` });
    } catch (error) {
      return interactions.reply({ content: `Successfully kicked ${user.username} for reason: ${reason}` })
    }
  }
}
