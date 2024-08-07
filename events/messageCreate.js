const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    try {
      const messageContent = message.content.toLowerCase();


      if (messageContent.includes("svidde")) {
        message.react("<:svidde:768197875652886560>");
      }

      if (messageContent.includes("gm")) {
        await message.reply("gm");
        message.react("🌞");
      }

      if (messageContent.includes("morn")) {
        await message.reply("morn");
        flaggor = ["🇩🇰", "🇫🇮", "🇫🇴"];
        message.react(flaggor[Math.floor(Math.random() * flaggor.length)]);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
