const { Events } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  disabled: true,
  data: {
    name: "translate",
    description: "Translate a messages (NOT 100% CORRECT)",
    contexts: [0,1,2],
    integration_types: [0,1],
    required: true,
    dm_permissions: true,
    options: [
      {
        name: "messages",
        description: "Contents of the messages to translate",
        type: 3,
        required: true,
      }
    ],
  },
  /**
   *
   * @param {Events.InteractionCreate} interaction
   * @param {log} log
   */
  async execute(interaction, log) {
    const contents = interaction.options.getString('messages');
    const out = await translate(contents, { to: 'en' });
    log.debug(`Input to translate: ${contents}`)
    interaction.reply(`${out.from.language.iso}: ${out.text}`)
  },
};
