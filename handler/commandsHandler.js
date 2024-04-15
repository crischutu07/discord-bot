const fs = require('node:fs');
const path = require('node:path');

module.exports = (client, log) => {
  const foldersPath = path.join(__dirname, '..', '\\commands');
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      console.debug(`Found files: ${command.data.name} => ${filePath}`)
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        console.debug(`Setting up commands: ${command.data.name}`);
        client.commands.set(command.data.name, command);
      } else {
        log.warn(`The command at ${filePath} is missing a required "data" (SlashCommandBuilder) or "execute" property.`);
      }

    }
  }
}