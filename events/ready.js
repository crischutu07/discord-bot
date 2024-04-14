const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.once(Events.ClientReady, readyClient => {
      console.debug(`Tag: ${client.user.username} (${readyClient.user.id})\nDisplay Name: ${client.user.displayName}`);
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });
  },
};
