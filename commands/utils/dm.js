const { CommandInteraction } = require('discord.js');

module.exports = {
  disabled: false,
  data: {
    name: "dm",
    description: "send a Direct Message to the specified user.",
    options: [
      {
        name: "user",
        description: "User to send a Direct Messages",
        type: 6
      },
      {
        name: "message",
        description: "Message to send DMs (default: Hello, World!)",
        type: 3
      }
    ]
  },
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const msg = interaction.options.getString('message') || "Hello, World!";
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id)
    try {
      await interaction.user.send(`You sent an DM to ${user.username} the followings content:\n\n${msg}`);
      await user.send(`From ${interaction.user.username} at <t:${(interaction.createdTimestamp / 1000).toFixed()}>\n\n${msg}`);
      return interaction.reply({ content: `You sent ${user.username} the following contents:\n\n${msg}`, ephemeral: true })
      // return interaction.followUp(`Sent the message to **${member.user.username}**!\n\nContents: "${msg}"`)
    } catch {
      return interaction.reply(`${member.user.username} is not enabled Direct Messages.`)
    }
  }
}
