// TODO: use new format (new-CommandFormat.js) then test this

const { SlashCommandBuilder, PermissionFlags } = require('discord.js');

module.exports = {
  name: "test",
  description: "Test command",
  showCommand: false,
  alias: ["tester"],
  perms: PermissionFlags.Administrator,

  main: async (interaction) => {
    // logic here
  }
}