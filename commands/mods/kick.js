const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user from the server.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to kick.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the kick.')
        .setRequired(false)),
    async execute(interactions){
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
      } catch(error) {
        return interactions.reply({ content: `Successfully kicked ${user.username} for reason: ${reason}` })
      }
    }
}