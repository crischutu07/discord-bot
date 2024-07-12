require('dotenv').config()

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const isVerbose = process.argv[2] === '-v' || '--verbose';
const Logger = require('./utils/logging');
const log = new Logger({
  verbose: isVerbose,
});

const token = process.env.TOKEN;
const eventHandler = require("./handler/eventHandler");
const commandHandler = require("./handler/commandsHandler");

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

try {
  if (!token) {
    log.error("No token provided");
    process.exit(1)
  }
} catch (e) {
  log.error("No token provided");
  process.exit(1)
}

log.info("Loading Handler...")

const eh = eventHandler(client, isVerbose);
const ch = commandHandler(client, isVerbose);

log.info(`Initalized Handler in ${(eh+ch).toFixed(3)}`)

client.login(token)

process.on('uncaughtException', (err) => {
  log.error(err)
});
