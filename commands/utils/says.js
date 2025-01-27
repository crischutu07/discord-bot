const { PermissionsBitField, Events } = require('discord.js');

module.exports = {
  disabled: false,
  data: {
    name: "say",
    description: "Says a thing to the bot",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    options: [
      {
        name: "message",
        description: "Type a string of text to say something",
        type: 3,
        required: true
      }
    ],
  },
  /**
   *
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction, log) {
    const str = interaction.options.getString('message');
    interaction.reply(str);
  }
}
