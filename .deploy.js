require("dotenv").config();

const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const Logger = require("./utils/logging");
const rest = new REST().setToken(token);
const isVerbose = process.argv[2] === '-v' || '--verbose';
const log = new Logger({
  verbose: isVerbose,
});

BigInt.prototype.toJSON = function() { return this.toString() }
const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.disabled === true) {
      log.notice(`${command.data.name} is now disabled.`)
      return;
    }
    if ('data' && 'execute' in command) {
      commands.push(command.data)
      log.debug(`${commands.length} => ${command.data.name}`)
    } else {
      log.warn(`${filePath} is missing neither "data" or "execute" property.`);
    }
  }
}
async function _loader(client, guild){
  try {
    log.info(`Registering ${commands.length} commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(client, guild),
      {body: commands },
    );
    return log.info(`Loaded ${data.length} commands.`);
  } catch (error) {
    log.error(`${error}`)
    console.error(error)
  }
}
_loader(clientId, guildId)


process.on('uncaughtExpection', (err) => {
  log.error(err)
})
