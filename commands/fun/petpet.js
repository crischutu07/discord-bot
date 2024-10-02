const { SlashCommandBuilder, PermissionsBitField, User, UserFlagsBitField } = require('discord.js');
module.exports = {
  disabled: false,
  data: {
    name: "petpet",
    description: "Pet a user by generating a patting gif.",
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    dm_permissions: true,
    options: [
      {
        name: "user",
        description: "User you want to pet.",
        required: true,
        type: 6,
      }
    ]
  },
  /**
   *
   * @param {SlashCommandBuilder} interactions
   *
   */
  async execute(interactions) {
    const user = interactions.options.getUser('user');
    interactions.reply({ content: `${user.avatarURL}`, ephemeral: true })
  }
}
