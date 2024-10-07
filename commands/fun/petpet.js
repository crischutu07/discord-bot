const { SlashCommandBuilder } = require('discord.js');

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
      },
    ]
  },
  /**
   *
   * @param {SlashCommandBuilder} interactions
   *
   */
  async execute(interactions) {
    const user = interactions.options.getUser('user');
    const petpet = require('pet-pet-gif');
    let avatar = user.displayAvatarURL({ extension: 'png' });
    let animatedGif = await petpet(avatar, {
      // The width (or height) of the generated gif
      resolution: 128,
      delay: 30,
      backgroundColor: null
    })
    interactions.reply({
      files: [{
        name: 'petpet.gif',
        attachment: animatedGif
      }],
      ephemeral: false
    })
  }
}
