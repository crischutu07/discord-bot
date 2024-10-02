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
      },
      {
        name: "delay",
        description: "Delay each frames in milliseconds. (Default is 20ms)",
        type: 4,
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
    const delay = interactions.options.getInteger('delay') || 30;
    if (delay > 512) {
      interactions.reply({ content: `You can't set delay value larger thsn 512\n-# Your value: ${delay}`, ephemeral: true })
    }
    const petpet = require('pet-pet-gif');
    let avatar = user.displayAvatarURL({ extension: 'png' });
    let animatedGif = await petpet(avatar, {
      // The width (or height) of the generated gif
      resolution: 128,
      delay: delay,
      // Other values could be the string "rgba(123, 233, 0, 0.5)". Defaults to null - i.e. transparent.
      backgroundColor: null
    })
    interactions.reply({ files: [{ name: 'petpet.gif', attachment: animatedGif }], ephemeral: false })
  }
}
