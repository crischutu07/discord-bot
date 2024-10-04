const { Events, ActivityType } = require("discord.js");
const chalk = require('chalk');
const { status, presenceName } = require("../config.json");
const presenceType = ActivityType.Playing;

module.exports = {
  name: Events.ClientReady,
  label: "Ready",
  once: true,
  /**
   *
   * @param client
   * @param log
   */
  async execute(client, log) {
    log.label = this.label;
    try {
    await client.user.setPresence({
      status: status,
      activities: [{
	name: presenceName,
	type: presenceType,
      }]
    })
    log.notice(`Client status: ${status}`)
    log.notice(`Presence Name: ${presenceName} (${presenceType})`)
    log.notice(`Tag: ${chalk.yellow(client.user.tag)} (${chalk.green(client.user.id)})`);
    log.notice(`Display Name: ${chalk.blue(client.user.displayName)}`)
    } catch(e){
      log.error(e)
    }
    log.info(`Ready! Logged in as ${chalk.green(client.user.username)}`);
    log.setLabel();
  },
};