const fs = require('node:fs');
const path = require('node:path');
var t1,t2;
module.exports = (client, log) => {
  this.label = "CommandsHandler"
  t1 = performance.now();
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
  t2 = performance.now();
  log.debug(`Initalized CommandsHandler in ${(t2-t1).toFixed(3)}ms`)
  return t2-t1;
}
