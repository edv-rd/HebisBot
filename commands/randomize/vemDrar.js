const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nagonsom")
    .setDescription("någon som drar i den?"),
  async execute(interaction) {
    verb = [
      "drar i",
      "piskar",
      "rullar",
      "kliar",
      "klämmer på",
      "jerkar",
      "runkar",
      "petar på",
      "klappar",
      "runkar",
      "rastar",
      "rycker i"
    ];
    objekt = [
      "sin jerry",
      "drulen",
      "dasen",
      "snasen",
      "sin dallas",
      "snorren",
      "masken",
      "larven",
      "räkan",
      "sladden",
      "sin fuling",
      "ormen",
      "snöret",
    ];

    await interaction.deferReply().then(() => console.log("defer?"));
    try {
      await interaction.editReply(`Någon som ${verb[Math.floor(Math.random() * verb.length)]} ${objekt[Math.floor(Math.random() * objekt.length)]}?`);
    } catch (e) {
      console.error(e);
      await interaction.editReply(`Tyvärr, min vän. Det uppstod ett fel. ${e}`);
    }
  },
};
