const { SlashCommandBuilder } = require("discord.js");
const letter = {
  'a': '[]____ ',
  'b': '/_/_ ',
  'c': '{}__ ',
  'd': '{}___ ',
  'e': '[]_ ',
  'f': '/_//_ ',
  'g': '|_|_ ',
  'h': '|__|_ ',
  'i': '[]___ ',
  'j': 'H_[]_ ',
  'k': 'i_ ',
  'l': '{}_ ',
  'm': '|_||_ ',
  'n': 'L__ ',
  'o': 'L__[]_ ',
  'p': '||_|_ ',
  'q': 'HH__ ',
  'r': 'L_ ',
  's': '[]__ ',
  't': 'L_[]_ ',
  'u': '{}____ ',
  'v': '/__/_ ',
  'w': 'i__ ',
  'x': 'i__[]_ ',
  'y': '//_/_ ',
  'z': 'i_[]_ '
};

const number = {
  '0': 'D',
  '1': 'D^',
  '2': 'D^^',
  '3': 'D^^^',
  '4': 'D^^^^',
  '5': 'D^^^^^',
  '6': 'D^^^^^^',
  '7': 'D^^^^^^^',
  '8': 'D^^^^^^^^',
  '9': 'D^^^^^^^^^'
};

const punctuations = {
  // (), [], {} => Those characters i don't know how to wrap it up
  // Since the author of this language didn't tell us how to wrap these.
  '(': '<]_',
  ')': '<]_',
  '[': '<]__',
  ']': '<]__',
  '{': '<]___',
  '}': '<]___',

  ':': '<-]_',
  ';': '<-]__',
  '-': '<-]___',
  ',': '<--]_',
  "'": '<--]__',
  '"': '<--]___',

  '.': '<<]_',
  '?': '<<]__',
  '!': '<<]___'
};

module.exports = {
  disabled: false,
  data: {
    name: 'parkour-lang',
    description: "Parkour languages from Parkour Civilization (WIP)",
    contexts: [0, 1, 2],
    integration_types: [0, 1],
    dm_permissions: true,
    options: [{
      name: 'decode',
      description: "Decode messages with parkour uages",
      type: 1,
      options: [{
        name: 'messages',
        description: "Contents of the messages to decode",
        required: true,
        type: 3,
      }]
    },
      {
        name: 'encode',
        description: "Encode messages with parkour languages",
        type: 1,
        options: [{
          name: 'messages',
          description: "Contents of the messages to encode",
          required: true,
          type: 3,
        }]
      },
      {
        name: 'about',
        description: "About the Parkour Language (from Parkour Civilization)",
        type: 1
      }
    ]
  },
  /**
   * @param {SlashCommandBuilder} interaction
   * @param log
   */
  async execute(interaction, log) {
    let input = interaction.options.getString("messages");
    let subcommand = interaction.options.getSubcommand();

    if (subcommand === 'decode') { // decode
      let output = [];
      let letters = Object.fromEntries(Object.entries(letter).map(
        ([key, value]) => [value.trim(), key]
      ));
      let num = Object.fromEntries(Object.entries(number).map(
        ([key, value]) => [value, key]
      ));
      let punctuation = Object.fromEntries(Object.entries(punctuations).map(
        ([key, value]) => [value, key]
      ));

      input.split(' ').forEach(char => {
        if (char === '*')
          output.push(' ');
        else if (letters[char])
          output.push(letters[char]);
        else if (num[char])
          output.push(num[char]);
        else if (punctuation[char])
          output.push(punctuation[char]);
      });
      log.debug(`Output decoder: ${output}`)
      if (output.length === 0)
        return await interaction.reply({
          content: "Output is empty, please double check the parameter and try again.",
          ephemeral: true
        });
      return await interaction.reply("```\n" +
        `${output.join('').toString()}\n` +
        "```\n");
    } else if (subcommand === 'encode'){
      let output = [];
      input = input.toLowerCase();

      for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === ' ') {
          if (output[output.length - 1] !== '*')
            output.push('*');
        } else if (letter[char])
          output.push(letter[char].trim());
        else if (number[char])
          output.push(number[char]);
        else if (punctuations[char])
          output.push(punctuations[char]);
      }
      log.debug(`Output encoder: ${output}`)
      if (output === 0)
        return await interaction.reply({
          content: "Output is empty, please double check the parameter and try again.",
          ephemeral: true
        });
      else
        return await interaction.reply("```\n" +
          `${output.join(' ').toString()}\n` +
          "```\n");
    } else if (subcommand === 'about'){
      await interaction.reply({
        content: "## [@ashmellow78's](<\https://x.com/ashmellow78>) Parkour Languages (Inspired)\n" +
          "**The Language itself can be found [here](<https://parkourcivilization.fandom.com/wiki/Parkour_Language>)**\n" +
        "-# More information of how these works by visit [this](<\https://x.com/ashmellow78/status/1841763587393474932>) tweet.",
        ephemeral: true
      })
    }
  }
}