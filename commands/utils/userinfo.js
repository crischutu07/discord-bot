const { SlashCommandBuilder, Embed, EmbedBuilder} = require('discord.js')
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

    const userinfoEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setURL(`${user}`)
      .setTitle(`${user.username}`)
      .setAuthor({ name: `${user.username}`, iconURL: `${member.user.avatarURL}` })
      .setDescription(`Display: ${user.displayName}`)
      .setThumbnail(`${member.user.avatarURL}`)
      .addFields(
        { name: 'Created At', value: `${(member.createdTimestamp / 1000).toFixed()}` },
        { name: '\u200B', value: '\u200B' },
        { name: 'Joined At', value: `${(user.createdTimestamp / 1000).toFixed()}`, inline: true },
      )
      .addFields({name: 'Inline field title', value: 'Some value here too.', inline: true})
      .setTimestamp()
      .setFooter({ text: `ID: ${user.id}`, iconURL: `${interaction.user.avatarURL}` });
    interaction.reply({ embeds: [userinfoEmbed] });
    // if (user){ // target info
    //   await interaction.reply({
    //     content: `**${user.username}'s** Infomations:\nJoined the server since: <t:${(member.joinedTimestamp / 1000).toFixed()}>\nAccount created since: <t:${(user.createdTimestamp / 1000).toFixed()}:F>`,
    //     ephemeral: true})
    // } else { // user's info
    //   await interaction.reply(  {
    //     content: `**${user.username}'s** Infomations:\nJoined the server since: <t:${(interaction.member.joinedTimestamp / 1000).toFixed()}:F>`,
    //     ephemeral: true
    //   })
    // }
  },
};
