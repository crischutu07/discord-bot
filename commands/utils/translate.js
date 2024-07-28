const { SlashCommandBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  disabled: false,
  data: {
    name: "translate",
    description: "Translate a messages.",
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
   */
  async execute(interaction, log) {
    const contents = interaction.options.getString('messages');
    const out = await translate(contents, { to: 'en' });
    log.debug(`Input to translate: ${contents}`)
    interaction.reply(`${out.from.language.iso}: ${out.text}`)
  },
};
