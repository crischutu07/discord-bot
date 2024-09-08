const fs = require('node:fs');
const path = require('node:path');
module.exports = async (client, log) => {
  log.label = "EventHandler";
  var t1, t2;
  t1 = performance.now()
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      await client.once(event.name, (...args) => event.execute(...args, log));
    } else {
      await client.on(event.name, (...args) => event.execute(...args, log));
    }
  }
  t2 = performance.now()
  log.debug(`Initalized EventHandler in ${(t2 - t1).toFixed(3)}ms`)
  return t2 - t1;
}
