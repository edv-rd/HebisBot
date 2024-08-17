const { SlashCommandBuilder, AttachmentBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("svidde_meme")
    .setDescription("gör ett svidde meme :)")
    .addStringOption((option) =>
      option.setName("top_text").setDescription("översta raden")
    )
    .addStringOption((option) =>
      option.setName("bottom_text").setDescription("understa raden")
    ),
  async execute(interaction) {
    await interaction.deferReply().then(() => console.log("defer?"));
    try {
        const canvas = Canvas.createCanvas(248, 203);
		const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./1.jpeg');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    
        interaction.reply({ files: [attachment] });
    } catch (e) {
      console.error(e);
      await interaction.editReply("Tyvärr, min vän. Det uppstod ett fel.");
    }
  },
};
