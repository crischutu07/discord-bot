require('dotenv').config()

// TODO: add category by folder's name (ex. manage/reload => Manager/reload command)
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const eventHandler = require('./');
const {copyFileSync} = require("node:fs");
const token = process.env.TOKEN;

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages
] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    console.debug(`Sucessfully set new commands: ${command.data.name} => ${filePath}`)
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`[${interaction.user.username}]No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      const channel = interaction.client.channels.cache.get('1228692306987585577');
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      channel.send(`${interaction.user.username}, issued the command: ${interaction.command.name}\nError: \`\`\`${error}\`\`\``);
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
// Execute all available events on ./events folder (can't be on a folder sadge)
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// umm sillies
client.on("messageCreate", (message) => {
  if (message.content.startsWith("nigga")) {
    message.reply("why are you racist?")
    message.reply("<@1001747794954039368> gonna punish u :3");
  } 
});



client.login(token);
