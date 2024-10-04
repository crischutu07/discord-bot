const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
let infoIcon = 'https://i.imgur.com/tjevwUV.png';
let userRound = 'https://i.imgur.com/Xpa0SWO.png';
module.exports = {
  disabled: false,
  data: {
    name: "userinfo",
    description: "Check about the user information.",
    options: [
      {
        name: "user",
        description: "The user you want to check",
        type: 6
      }
    ]
  },
  /**
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const userinfoEmbed = new EmbedBuilder()
      .setColor('#0098ff')
      .setTitle(`${member.user.displayName}`)
      .setURL(`https://discordlookup.com/user/${user.id}`)
      .setAuthor({ name: `User information: ${user.username}`, iconURL: `${infoIcon}` })
      .setDescription(`Display: ${member.user.displayName}`)
      .setThumbnail(`${member.displayAvatarURL()}`)
      .addFields(
        { name: 'Created At', value: `<t:${(user.createdTimestamp / 1000).toFixed()}:R>`, inline: true },
        { name: 'Joined At', value: `<t:${(member.joinedTimestamp / 1000).toFixed()}:R>`, inline: true },
      )
      .setTimestamp()
      .setFooter({ text: `ID: ${user.id}`, iconURL: userRound }); // add iconURL
    interaction.reply({ embeds: [userinfoEmbed] });
  },
};
