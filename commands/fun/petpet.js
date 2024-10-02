const { SlashCommandBuilder, PermissionsBitField, User, UserFlagsBitField } = require('discord.js');
const petPetGif = require('pet-pet-gif');

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
  async execute(interactions, petpet) {
    const user = interactions.options.getUser('user');
    let animatedGif = await petpet(user.avatarURL(), {
      // The width (or height) of the generated gif
      resolution: 128,
      // Delay between each frame in milliseconds. Defaults to 20.
      delay: 20,
      // Other values could be the string "rgba(123, 233, 0, 0.5)". Defaults to null - i.e. transparent.
      backgroundColor: null
    })
    interactions.reply({ files: [animatedGif], ephemeral: true })
  }
}
