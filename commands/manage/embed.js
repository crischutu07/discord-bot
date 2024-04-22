const { CommandInteraction, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  disabled: false,
  data: {
    name: "embed",
    description: "Test embed",
    default_member_permissions: PermissionsBitField.Flags.ManageGuild,
  },
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Title Embed')
      .setURL('https://discord.js.org/')
      .setAuthor({ name: 'Author Embed', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
      .setDescription('Description Embed')
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: 'new line?\u200B', value: '\u200B' },
        { name: 'Inline field title 0', value: 'Some value here 0', inline: true },
        { name: 'Inline field title 1', value: 'Some value here 1', inline: true },
      )
      .addFields({ name: 'Regular Field title 2', value: 'Some value here 2', inline: false })
      .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    interaction.reply({ embeds: [exampleEmbed] });


  }
}
