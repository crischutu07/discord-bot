
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    disabled: false,
    data: {
        name: "mdship",
        description: "Random Murder Drones ship generator (really cursed i guess so.)",
        required: false,
    },
    /**
     *
     * @param {SlashCommandBuilder} interaction
     */
    async execute(interaction) {
        const crypto = require("crypto")

        let a = [
            "Alice",
            "Amda",
            "Beau",
            "Braidon",
            "Braxton",
            "Cyn",
            "Darren",
            "Doll",
            "Doll's Father",
            "Dr. Ridley",
            "Eldritch J",
            "Emily",
            "Frank",
            "Grant",
            "Hearts",
            "James Elliott",
            "Katie",
            "Kelsey Day",
            "Keybug",
            "Khan Doorman",
            "Lizzy",
            "Lord Frumptlebucket",
            "Louisa Elliott",
            "Makarov (Khan's Guard)",
            "Mitchell",
            "Nori Doorman",
            "Penny",
            "Rebecca",
            "Reid",
            "Riley",
            "Ron",
            "Ronathon (Bus Driver)",
            "Sam",
            "Sarah",
            "Sentinels (Blue Dino)",
            "Sentinels (Red Dino)",
            "Serial Designation J",
            "Serial Designation N",
            "Serial Designation V",
            "Teacher",
            "Tessa Elliott",
            "Thad",
            "Tim",
            "Todd",
            "Trevor",
            "Uzi Doorman",
            "Yeva"
        ]

        // let b = [];
        //
        // for (let i = 0; i < a.length; i++) {
        //     for (let j = 0; j < a.length; j++) {
        //         b.push(`"${a[i]}" ship with "${a[j]}"`)
        //     }
        // }
        interaction.reply(`**${a[crypto.randomInt(a.length)]}** ship with **${a[crypto.randomInt(a.length)]}**`)
    },
};
