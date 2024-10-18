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
      .setName("micke_meme")
      .setDescription("gör ett micke meme :)")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("text")
          .setRequired(true)
          .setMaxLength(32)
      ),
      
    async execute(interaction) {
      await interaction.deferReply().then(() => console.log("defer?"));
      try {
        const canvas = Canvas.createCanvas(548, 348);
        const context = canvas.getContext("2d");
  
        
        const applyText = (canvas, text) => {
  
          const context = canvas.getContext('2d');
        
          // Declare a base size of the font
          let fontSize = 120;
        
          do {
            // Assign the font to the context and decrement it so it can be measured again
            context.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
          } while (context.measureText(text).width > 200);
        
          // Return the result to use in the actual canvas
          return context.font;
        };
        
  
        const background = await Canvas.loadImage("./micke.png");
  
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
  
        const text = interaction.options.getString("text");
        const splitTextArray = text.split(" ")
        const splitTextArraySecond = splitTextArray.splice(0, Math. ceil(splitTextArray. length / 2));
        
        context.fillStyle = "#000000";

        context.font = applyText(canvas, splitTextArray);
        context.fillText(splitTextArray, 11, 150, 197);

        context.font = applyText(canvas, splitTextArraySecond);
        context.fillText(splitTextArraySecond, 11, 240, 197);

  
        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode("png"), {
          name: "micke_meme.png",
        });
  
        interaction.editReply({ files: [attachment] });
      } catch (e) {
        console.error(e);
        await interaction.editReply("Tyvärr, min vän. Det uppstod ett fel.");
      }
    },
  };
  