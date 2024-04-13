const fs = require('fs');
const slashCommands = [];
module.exports = (client) => { // unfinished
  let count = 0;
  fs.readdirSync(`./commands`, async (err, dir) => {
  const commands = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
  for (const file of commands) {
    const pull = require(`../commands/${dir}/${file}`);
    if (pull.name) {
      client.interactions.set(pull.name, pull);
      slashCommands.push(pull);
      count++;
    } else {
      continue;
    }
  }
  
  client.on('ready', async () => {
    await client.application.commands.set(slashCommands);
  })
  })
  
  
  console.log(count +` slash commands are pushed!`);
}