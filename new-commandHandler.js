// TODO: Implement new command handler

const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const cmdPath = path.join(__dirname, '..', '/commands')
  const cmdFolders = fs.readdirSync(cmdPath);

  // this part registers command depends on command structure that is specified
  for (const file of cmdFolders) {
    const filePath = path.join(cmdPath, file)
    const cmd = require(filePath);
    if (!'name' || 'description' in cmd) {
      console.error(`${file.name} Seems missing the command names or description.`)
    }
    for (cmd.alias in cmd) {
      if (cmd.alias) client.commands.set(cmd.alias); else {
        client.commands.set(cmd.name, cmd);
      }
    }
  }
}