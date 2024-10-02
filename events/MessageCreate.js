const { Events } = require('discord.js');
module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message, log) {
    log.label = this.name
    if (message.author.id === message.client.user.id) return;
    log.debug(`${message.author.username}: ${message}`)
  }
}
