const { SlashCommandBuilder } = require("discord.js");
const fetchRandom = require("../../util/fetch-random");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dagensnyheter")
    .setDescription("ny upplaga av dagens nyheter"),
  async execute(interaction) {
    // await interaction.reply("Stefan tänker,,,,,,,,");
    try {
      // make tidningsnamn

      const tidning1 = await fetchRandom("tidning1");
      const tidning2 = await fetchRandom("tidning2");

      const renderedTidningsnamn = `${tidning1}${tidning2}`;

      // make headline

      const headlinesArray = [
        async () => {
          const person = await fetchRandom("headline_person");
          const aktivitet = await fetchRandom("headline_aktivitet");
          const plats = await fetchRandom("headline_plats");
          const geografi = await fetchRandom("headline_geografi");
          return `${person} ${aktivitet} ${plats} ${geografi}`;
        },
        async () => {
          const person = await fetchRandom("headline_person");
          const aktivitet = await fetchRandom("headline_aktivitet");
          const geografi = await fetchRandom("headline_geografi");

          return `${person} ${aktivitet} ${geografi}`;
        },
        async () => {
          const person = await fetchRandom("headline_person");
          const aktivitet = await fetchRandom("headline_aktivitet");

          return `${person} ${aktivitet}`;
        },
        async () => {
          const person = await fetchRandom("headline_person");
          const aktivitet = await fetchRandom("headline_aktivitet");

          const plats = await fetchRandom("headline_plats");
          return `${person} ${aktivitet} ${plats}`;
        },
      ];

      const renderedHeadline = await headlinesArray[
        Math.floor(Math.random() * headlinesArray.length)
      ]();

      // make opinion

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
          return `Nej, ${person}, det är inte ${ord} med ${företeelse}!`;
        },
        async () => {
          const problemet = await fetchRandom("problemet");
          const lösning = await fetchRandom("lösning");
          return `Lösningen på ${problemet} är enkel - ${lösning}!`;
        },
      ];

      const renderedOpinionEntry = await opinionsArray[
        Math.floor(Math.random() * opinionsArray.length)
      ]();

      const skribentFornamn = await fetchRandom("skribent-fornamn");
      const skribentEfternamn = await fetchRandom("skribent-efternamn");

      const renderedOpinionSkribent = `${skribentFornamn} ${skribentEfternamn}`;

      const opinionIntros = [
        `Huvudledare signerad ${renderedOpinionSkribent}:`,
        `${renderedOpinionSkribent} tar till orda:`,
        `${renderedOpinionSkribent} vid pennan:`,
        `Opinion av ${renderedOpinionSkribent}:`,
      ];

      const renderedOpinionIntro =
        opinionIntros[Math.floor(Math.random() * opinionIntros.length)];

      // make the whole thing!

      const renderedNyheter = `
            📰 ${renderedTidningsnamn} 📰

            🗞 DAGENS NYHETER: 
            ➡ ${renderedHeadline} 

            🖋 ${renderedOpinionIntro}
            ➡ "${renderedOpinionEntry}"
            `;

      await interaction.editReply(renderedNyheter);
    } catch (e) {
      console.error(e);
      await interaction.editReply(`Tyvärr, min vän. Det uppstod ett fel. ${e}`);
    }
  },
};
