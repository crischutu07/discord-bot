require('dotenv').config()
const token = process.env.TOKEN;
const eventHandler = require("./handler/eventHandler");
const commandHandler = require("./handler/commandsHandler");
module.exports = (client, log) => {
  try {
    if (!token) {
      log.error("No token provided");
      process.exit(1)
    }
  } catch (e) {
    log.error("No token provided");
    process.exit(1)
  }
  log.info("Loading Handler...")
  eventHandler(client, log);
  commandHandler(client, log);
  client.login(token).then(async () => {
    log.debug("Logged in client")
  });
}
