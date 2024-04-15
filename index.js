require('dotenv').config()

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const log = require('custom-logger').config({ format: '[%timestamp%] [%event%]%message%'  });
log.new({
  info: { color: 'cyan', level: 0, event: 'INFO' },
  notice: { color: 'orange', level: 1, event: 'NOTICE' },
  warn: { color: 'yellow', level: 2, event: 'WARN' },
  error: { color: 'red', level: 3, event: 'ERROR' }
});
// Main Handler
const eventHandler = require('./handler/eventHandler');
const commandHandler = require('./handler/commandsHandler');

const token = process.env.TOKEN;

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages
] });

client.commands = new Collection();
eventHandler(client)
commandHandler(client, log)

client.login(token)
