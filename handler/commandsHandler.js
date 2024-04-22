const fs = require('node:fs');
const path = require('node:path');

module.exports = (client, log) => {
  log.setLabel("CommandsHandler")
  const foldersPath = path.join(__dirname, '..', 'commands');
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if (command.disabled) {
        log.notice(`${command.data.name} is disabled, skipping..`)
        return;
      };
      if ('data' && "execute" in command) {
        log.debug(`Setting up commands: ${command.data.name}`);
        client.commands.set(command.data.name, command);
      } else {
        log.warn(`${filePath} is missing a required "data" (SlashCommandBuilder) or "execute" property.`);
      }

    }
  }
}
