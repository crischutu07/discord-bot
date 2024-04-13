const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")  
    .setDescription("Checks about the user infomations.")
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to check')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    if (user){ // target info
      await interaction.reply({
        content: `**${user.username}'s** Infomations:\nJoined the server since: <t:${(member.joinedTimestamp / 1000).toFixed()}>\nAccount created since: <t:${(user.createdTimestamp / 1000).toFixed()}:F>`,
        ephemeral: true})
    } else { // user's info
      await interaction.reply(  {
        content: `**${user.username}'s** Infomations:\nJoined the server since: <t:${(interaction.member.joinedTimestamp / 1000).toFixed()}:F>`,
        ephemeral: true
      })
    }
  },
};
