require("dotenv").config();

const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const Logging = require("./utils/logging");
const rest = new REST().setToken(token);
const log = new Logging()
log.label = "DeployCommands";

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const disabledCommands = [];
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.disabled == true) {
      disabledCommands.push(command.data.toJSON())
      log.notice(`${command.data.name} is now disabled.`)
      return;
    }
    if ('data' && 'execute' in command) {
      commands.push(command.data.toJSON());
      log.debug(`Passed commands: ${command.data.name}`)

    } else {
      log.warn(`${filePath} is missing neither "data" or "execute" property.`);
    }
  }
}
(async () => {
  try {
    log.info(`Registering ${commands.length} commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    log.info(`Loaded ${data.length} commands.`);
  } catch (error) {
    log.error(error)
  }
})
