require('dotenv').config()

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const isVerbose = process.argv[2] === ('-v' || '--verbose') ?? false;
const Logger = require('./utils/logging');
const log = new Logger({
  verbose: isVerbose,
});
if (isVerbose)
  log.debug("Verbose logging is enabled.")
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
const eh = performance.now()
const handlerPath = path.join(__dirname, 'handler');
const handlerFiles = fs.readdirSync(handlerPath).filter(file => file.endsWith('.js'));
for (const file of handlerFiles) {
  const filePath = path.join(handlerPath, file);
  const handler = require(filePath);
  log.label = handler.label;
  handler(client, log)
}
log.label = "Main"
const ch = performance.now()
log.info(`Initalized Handler in ${(eh+ch).toFixed(3)}ms`)

client.login(token)

process.on('uncaughtException', (err) => {
  log.error(err)
});