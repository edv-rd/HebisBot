const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const fetchRandom = require("../../util/fetch-random");
const Canvas = require("@napi-rs/canvas");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dagensnyheter")
    .setDescription("ny upplaga av dagens nyheter"),
  async execute(interaction) {
    await interaction.deferReply().then(() => console.log("defer?"));

    try {
      const fetchEverything = async () => {
        const tidning1 = await fetchRandom("tidning1");
        const tidning2 = await fetchRandom("tidning2");
        const renderedTidningsnamn = `${tidning1}${tidning2}`;

        const person = await fetchRandom("headline_person");
        const aktivitet = await fetchRandom("headline_aktivitet");
        const plats = await fetchRandom("headline_plats");

        const headlinesArray = [
          `${person} ${aktivitet} ${plats}`,
          `${person} ${aktivitet}`,
        ];

        const renderedHeadline = await headlinesArray[
          Math.floor(Math.random() * headlinesArray.length)
        ];

        const opinionsArray = [
          async () => {
            const uppmaning = await fetchRandom("headline_uppmaning");
            const målgrupp = await fetchRandom("headline_målgrupp");
            const aktiviteter = await fetchRandom("headline_aktiviteter");
            const tidplats = await fetchRandom("headline_tidplats");
            return `${uppmaning} ${målgrupp} ${aktiviteter} ${tidplats}`;
          },
          async () => {
            const koncept = await fetchRandom("koncept");
            const retorisk_fråga = await fetchRandom("retorisk_fråga");
            return `${koncept} - ${retorisk_fråga}?`;
          },
          async () => {
            const person = await fetchRandom("person");
            const ord = await fetchRandom("ord");
            const företeelse = await fetchRandom("företeelse");
            return `Nej, ${person}, det är inte "${ord}" med ${företeelse}`;
          },
          async () => {
            const problemet = await fetchRandom("problemet");
            const lösning = await fetchRandom("lösning");
            return `Lösningen på ${problemet} är enkel - ${lösning}`;
          },
        ];

        const renderedOpinionEntry = await opinionsArray[
          Math.floor(Math.random() * opinionsArray.length)
        ]();

        const skribentFornamn = await fetchRandom("skribent-fornamn");
        const skribentEfternamn = await fetchRandom("skribent-efternamn");

        const renderedOpinionSkribent = `${skribentFornamn} ${skribentEfternamn}`;

        return {
          renderedHeadline,
          renderedOpinionEntry,
          renderedOpinionSkribent,
          renderedTidningsnamn,
        };
      };

      const {
        renderedHeadline,
        renderedOpinionEntry,
        renderedOpinionSkribent,
        renderedTidningsnamn,
      } = await fetchEverything();

      const getRandomImage = (directoryPath) => {
        return new Promise((resolve, reject) => {
          fs.readdir(directoryPath, { withFileTypes: true }, async (err, files) => {
            if (err) {
              reject(err);
            } else {
              const fileNames = files.filter(file => file.isFile()).map(file => file.name);

              if (fileNames.length === 0) {
                reject(new Error("No files found in the directory."));
              } else {
                const randomFile = fileNames[Math.floor(Math.random() * fileNames.length)];
                const headlinePicture = await Canvas.loadImage(`${directoryPath}${randomFile}`);
                resolve(headlinePicture);
              }
            }
          });
        });
      };

      const canvas = Canvas.createCanvas(1041, 900);
      const context = canvas.getContext("2d");

      const background = await Canvas.loadImage("./newspaper.png");
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const splitTextArray = renderedHeadline.split(" ");
      const splitTextArraySecond = splitTextArray.splice(
        0,
        Math.ceil(splitTextArray.length / 2)
      );

      const splitText = splitTextArray.join(" ");
      const splitTextSecond = splitTextArraySecond.join(" ");

      const headlinePicture = await getRandomImage("./headline/");


      context.font = `2em InterVariable, Georgia, "Times", "Times New Roman", serif`;
      context.fillText(renderedTidningsnamn.toUpperCase(), 9, 74);

      context.font = `65px Tiempos, Georgia, "Times", "Times New Roman", serif`;
      context.fillText(splitText, 54, 394, 590);

      context.font = `65px Tiempos, Georgia, "Times", "Times New Roman", serif`;
      context.fillText(splitTextSecond, 54, 311, 590);

      context.drawImage(headlinePicture, 668, 162, 370, 370);

      const attachment = new AttachmentBuilder(await canvas.encode("png"), {
        name: "newspaper.png",
      });

      interaction.editReply({ files: [attachment] });
    } catch (e) {
      console.error(e);
      await interaction.editReply(`Tyvärr, min vän. Det uppstod ett fel. ${e}`);
    }
  },
};
