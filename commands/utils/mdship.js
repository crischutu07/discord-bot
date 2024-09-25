const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  disabled: false,
  data: {
    name: "mdship",
    description: "Random Murder Drones ship generator (really cursed i guess so.)",
    required: false,
    dm_permissions: true,
  },
  /**
   *
   * @param {SlashCommandBuilder} interaction
   */
  async execute(interaction, log, chalk) {
    const { randomInt } = require("crypto")

    let a = new Map([
      ["Alice", "https://murder-drones.fandom.com/wiki/Alice"],
      ["Amda", "https://murder-drones.fandom.com/wiki/Amda"],
      ["Beau", "https://murder-drones.fandom.com/wiki/Beau"],
      ["Braidon", "https://murder-drones.fandom.com/wiki/Braidon"],
      ["Braxton", "https://murder-drones.fandom.com/wiki/Braxton"],
      ["Cyn", "https://murder-drones.fandom.com/wiki/Cyn"],
      ["Darren", "https://murder-drones.fandom.com/wiki/Darren"],
      ["Doll", "https://murder-drones.fandom.com/wiki/Doll"],
      ["Doll's Father", "https://murder-drones.fandom.com/wiki/Doll%27s_Father"],
      ["Dr. Ridley", "https://murder-drones.fandom.com/wiki/Dr._Ridley"],
      ["Eldritch J", "https://murder-drones.fandom.com/wiki/Eldritch_J"],
      ["Emily", "https://murder-drones.fandom.com/wiki/Emily"],
      ["Frank", "https://murder-drones.fandom.com/wiki/Frank"],
      ["Grant", "https://murder-drones.fandom.com/wiki/Grant"],
      ["Hearts", "https://murder-drones.fandom.com/wiki/Hearts"],
      ["James Elliott", "https://murder-drones.fandom.com/wiki/James_Elliott"],
      ["Katie", "https://murder-drones.fandom.com/wiki/Katie"],
      ["Kelsey Day", "https://murder-drones.fandom.com/wiki/Kelsey_Day"],
      ["Keybug", "https://murder-drones.fandom.com/wiki/Keybug"],
      ["Khan Doorman", "https://murder-drones.fandom.com/wiki/Khan_Doorman"],
      ["Lizzy", "https://murder-drones.fandom.com/wiki/Lizzy"],
      ["Lord Frumptlebucket", "https://murder-drones.fandom.com/wiki/Lord_Frumptlebucket"],
      ["Louisa Elliott", "https://murder-drones.fandom.com/wiki/Louisa_Elliott"],
      ["Makarov", "https://murder-drones.fandom.com/wiki/Makarov"],
      ["Mitchell", "https://murder-drones.fandom.com/wiki/Mitchell"],
      ["Nori Doorman", "https://murder-drones.fandom.com/wiki/Nori_Doorman"],
      ["Penny", "https://murder-drones.fandom.com/wiki/Penny"],
      ["Rebecca", "https://murder-drones.fandom.com/wiki/Rebecca"],
      ["Reid", "https://murder-drones.fandom.com/wiki/Reid"],
      ["Riley", "https://murder-drones.fandom.com/wiki/Riley"],
      ["Ron", "https://murder-drones.fandom.com/wiki/Ron"],
      ["Ronathon", "https://murder-drones.fandom.com/wiki/Ronathon"],
      ["Sam", "https://murder-drones.fandom.com/wiki/Sam"],
      ["Sarah", "https://murder-drones.fandom.com/wiki/Sentinels"],
      ["Sentinels", "https://murder-drones.fandom.com/wiki/Sentinels"],
      ["Serial Designation J", "https://murder-drones.fandom.com/wiki/Serial_Designation_J"],
      ["Serial Designation N", "https://murder-drones.fandom.com/wiki/Serial_Designation_N"],
      ["Serial Designation V", "https://murder-drones.fandom.com/wiki/Serial_Designation_V"],
      ["Teacher", "https://murder-drones.fandom.com/wiki/Teacher"],
      ["Tessa Elliott", "https://murder-drones.fandom.com/wiki/Tessa_Elliott"],
      ["Thad", "https://murder-drones.fandom.com/wiki/Thad"],
      ["Tim", "https://murder-drones.fandom.com/wiki/Tim"],
      ["Todd", "https://murder-drones.fandom.com/wiki/Todd"],
      ["Trevor", "https://murder-drones.fandom.com/wiki/Trevor"],
      ["Uzi Doorman", "https://murder-drones.fandom.com/wiki/Uzi_Doorman"],
      ["Yeva", "https://murder-drones.fandom.com/wiki/Yeva"]
    ]);
    var cb = a.keys().toArray()
    var c1 = {
      name: cb[randomInt(cb.length)],
      url: a.get(cb[randomInt(cb.length)])
    }
    var c2;
    do {
      var c2 = {
        name: cb[randomInt(cb.length)],
        url: a.get(cb[randomInt(cb.length)])
      }
    } while (c1 === c2)

    log.debug(`${chalk.yellow(interaction.user.username)} Murder Drone ships: ${chalk.green(c1)} x ${chalk.green(c2)}`)
    interaction.reply(`**[${c1.name}](<${c1.url}>)** ship with **[${c2.name}](<${c2.url}>)**`)
  },
};
