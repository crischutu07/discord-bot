require("dotenv").config();

const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const Logging = require("./utils/logging");

const log = new Logging()
log.label = "DeployCommands"
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' || 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      log.warn(`${filePath} is missing neither "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    log.error(error)
  }
})();
