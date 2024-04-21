const { Client, GatewayIntentBits, Collection } = require('discord.js');
const Logger = require('./utils/logging');
const log = new Logger();
const init = require('./init')

let allowedMentions = ["users"]
const client = new Client({
  allowedMentions: {
    parse: allowedMentions
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

init(client, log) // 9 + 10 = 21
