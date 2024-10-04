const { SlashCommandBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  disabled: false,
  data: {
    name: "translate",
    description: "Translate a messages.",
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
   * @param {SlashCommandBuilder} interaction
   * @param {log} log
   */
  async execute(interaction, log) {
    const contents = interaction.options.getString('messages');
    const out = await translate(contents, { to: 'en' });
    log.debug(`Input to translate: ${contents}`)
    interaction.reply(`${out.from.language.iso}: ${out.text}`)
  },
};
