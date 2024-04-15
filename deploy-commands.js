const { REST, Routes } = require('discord.js');
const { clientId, guildId } = require('./config.json');
require('dotenv').config() 
const token = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const log = require('custom-logger').config({ format: '[%timestamp%] [%event%]%message%'  });
log.new({
	info: { color: 'cyan', level: 0, event: 'INFO' },
	notice: { color: 'orange', level: 1, event: 'NOTICE' },
	warn: { color: 'yellow', level: 2, event: 'WARN' },
	error: { color: 'red', level: 3, event: 'ERROR' }
});

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	log.debug("Found category: " + folder);
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			log.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		log.info(`${commands.length} application (/) commands detected, loading into discord bot..`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		log.info(`Loaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		log.error("There's something occured while deploying commands.")
		console.error(error);
	}
})();