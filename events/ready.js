const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  label: "ClientReady",
  once: true,
  /**
   *
   * @param client
   * @param log
   */
  async execute(client, log) {
    log.label = this.label;
    log.debug(`Tag: ${client.user.username} (${client.user.id})`);
    log.debug(`Display Name: ${client.user.displayName}`)
    log.info(`Ready! Logged in as ${client.user.tag}`);
  },
};
