const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  disabled: false,
  data: {
    name: "eval",
    description: "Evaulate JavaScript Commands",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    options: [
      {
        name: "eval",
        description: "JavaScript code",
        type: 3,
      },
    ]
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction, log) {
    const userEval = interaction.options.getString('eval');
    log.debug("User eval: " + userEval)
    try {
    const output = eval(userEval)
    log.debug("Eval output: " + output)
    interaction.reply('Output: ```js\n' + output + '\n```')
    } catch(e){
      log.debug("User error: " + e);
      interaction.reply('Error: ```js\n' + e + '\n```')
    }   
  }
}
