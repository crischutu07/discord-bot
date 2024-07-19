const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message, log, client){
    log.label = this.name
    if (message.author.id == client.user.id) return;
    log.debug(`${message.author.username}: ${message}`)
  }
}