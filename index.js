require('dotenv').config()

// TODO: add category by folder's name (ex. manage/reload => Manager/reload command)
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
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
      // const channel = interaction.client.channels.cache.get('1228692306987585577');
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      // channel.send(`${interaction.user.username}, issued the command: ${interaction.command.name}\nError: \`\`\`${error}\`\`\``);
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});
// TODO: unfinished
let arr = ['events', 'slash'];
arr.forEach(handler => require("./handler/")(client));

client.on("messageCreate", (message) => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply("Hey!.")
  } 
});


client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
