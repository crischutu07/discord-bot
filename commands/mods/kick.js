const { Events, PermissionsBitField } = require("discord.js");
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
      },
    ],
  },
  /**
   *
   * @param {Events.InteractionCreate} interactions
   *
   */
  async execute(interactions) {
    const user = interactions.options.getUser("user");
    const reason =
      interactions.options.getString("reason") || "No reason provided.";
    const member = interactions.guild.members.cache.get(user.id);

    await interactions.deferReply();

    if (!member) {
      return interactions.followUp({
        content: "That user is not in this server.",
        ephemeral: true,
      });
    }
    if (!member.kickable) {
      return interactions.followUp({
        content: "I cannot kick that user.",
        ephemeral: true,
      });
    }
    try {
      await member.send(
        `You're been kicked from **crischutu07's Server** Reason: ${reason}`
      );
      await member.kick(reason);
      return interactions.followUp({
        content: `Successfully kicked ${user.username} for reason: ${reason} (Recieved DMs)`,
        ephemeral: true
      });
    } catch (error) {
      return interactions.followUp({
        cantent: `Successfully kicked ${user.username} for reason: ${reason}`,
      });
    }
  },
};
