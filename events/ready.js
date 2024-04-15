const { Events } = require("discord.js");
const log = require('custom-logger').config({ format: '[%timestamp%] [%event%]%message%'  });
log.new({
  info: { color: 'cyan', level: 0, event: 'INFO' },
  notice: { color: 'orange', level: 1, event: 'NOTICE' },
  warn: { color: 'yellow', level: 2, event: 'WARN' },
  error: { color: 'red', level: 3, event: 'ERROR' }
});

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.debug(`Tag: ${client.user.username} (${client.user.id})`);
    console.debug(`Display Name: ${client.user.displayName}`)
    console.debug(`Token: ${client.user.accessToken}`);
    log.info(`Ready! Logged in as ${client.user.tag}`);
  },
};
