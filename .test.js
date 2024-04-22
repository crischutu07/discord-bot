const fs = require("node:fs")
const path = require("node:path")
const Logging = require("./utils/logging")
const log = new Logging()
log.label = "CommandTestChecker"

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.disabled == true) {
      log.notice(`Found ${command.data.name} (DISABLED)`)
      log.info(`=> ${command.data.description}`)
      return;
    }
    if ('data' && 'execute' in command) {
      log.info(`Found ${command.data.name}:`)
      log.info(`=> ${command.data.description}`)
    } else {
      log.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
