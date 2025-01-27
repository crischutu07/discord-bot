const { Events, PermissionsBitField } = require('discord.js')
const {ownerId} = require('../../config.json')
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
   * @param {Events.InteractionCreate} interaction
   * @param log
   */
  async execute(interaction, log) {
    const userEval = interaction.options.getString('eval');
    if (!interaction.user.id === ownerId) return interaction.reply({ 
      content: "Only owner of this bot can execute this command!", 
      ephemeral: true 
    });
    log.debug("User eval: " + userEval)
    try {
    const output = eval(userEval)
    log.debug("Eval output: " + output)
    interaction.reply({ 
      content: 'Output: ```js\n' + output + '\n```', 
      ephemeral: true
    })
    } catch(e){
      log.debug("User error: " + e);
      interaction.reply({
        content: 'Error: ```js\n' + e + '\n```',
        ephemeral: true
      })
    }   
  }
}
