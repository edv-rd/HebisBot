const {
  SlashCommandBuilder,
  AttachmentBuilder,
  Client,
  Events,
  GatewayIntentBits,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("svidde_meme")
    .setDescription("gör ett svidde meme :)")
    .addStringOption((option) =>
      option
        .setName("top_text")
        .setDescription("översta raden")
        .setRequired(true)
        .setMaxLength(10)
    )
    .addStringOption((option) =>
      option
        .setName("bottom_text")
        .setDescription("understa raden")
        .setRequired(true)
        .setMaxLength(10)
    ),
  async execute(interaction) {
    await interaction.deferReply().then(() => console.log("defer?"));
    try {
      const canvas = Canvas.createCanvas(1024, 1024);
      const context = canvas.getContext("2d");

      /*
      const applyText = (canvas, text) => {

        const context = canvas.getContext('2d');
      
        // Declare a base size of the font
        let fontSize = 70;
      
        do {
          // Assign the font to the context and decrement it so it can be measured again
          context.font = `${fontSize -= 10}px sans-serif`;
          // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (context.measureText(text).width > canvas.width - 300);
      
        // Return the result to use in the actual canvas
        return context.font;
      };
      */

      const background = await Canvas.loadImage("./1.png");

      // This uses the canvas dimensions to stretch the image onto the entire canvas
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const top_text = interaction.options.getString("top_text");
      const bottom_text = interaction.options.getString("bottom_text");

      context.font = "120px sans-serif";
      context.fillStyle = "#ffffff";

      context.fillText(top_text, 40, 120);
      context.fillText(bottom_text, 40, 900);

      // Use the helpful Attachment class structure to process the file for you
      const attachment = new AttachmentBuilder(await canvas.encode("png"), {
        name: "profile-image.png",
      });

      interaction.editReply({ files: [attachment] });
    } catch (e) {
      console.error(e);
      await interaction.editReply("Tyvärr, min vän. Det uppstod ett fel.");
    }
  },
};
