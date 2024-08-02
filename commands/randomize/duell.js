const {
  SlashCommandBuilder,
  UserSelectMenuBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const getName = require('../../util/get-name.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duell")
    .setDescription("duellera nån!"),
  async execute(interaction) {
    try {
      const select = new UserSelectMenuBuilder()
        .setCustomId("user_select")
        .setPlaceholder("Välj en användare att duellera")
        .setMinValues(1)
        .setMaxValues(1);

      const row = new ActionRowBuilder().addComponents(select);

      await interaction.reply({
        content: "Vem duellerar du?",
        components: [row],
        ephemeral: true, // Make it ephemeral to avoid cluttering the chat
      });

      const collectorFilter = (i) => i.user.id === interaction.user.id;

      try {
        const confirmation = await interaction.channel.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000,
        });

        // Get the selected user ID
        const selectedUserId = confirmation.values[0];
        // Fetch the member using the selected user ID
        const selectedMember = await interaction.guild.members.fetch(
          selectedUserId
        );

        const yourNickname = getName(interaction.user.username)
        const nickname = getName(selectedMember.user.username);

        const duelArray = [yourNickname, nickname];

        const duelWinner = duelArray[Math.floor(Math.random()* duelArray.length)];

        const duelLoser = duelWinner == yourNickname ? nickname : yourNickname; 

        const resultat = [
            `${duelWinner} hugger direkt av ${duelLoser}s huvud med en katana`,
            `${duelWinner} skjuter ${duelLoser} i huvudet med ett raketgevär`,
            `${duelWinner} spränger ${duelLoser} med en atombomb`,
            `${duelWinner} skjuter en Magnum 44 rakt i ${duelLoser}s anus`,
            `${duelWinner} smittar ${duelLoser} med fail aids...`,
            `${duelWinner} headshottar ${duelLoser} med railgun`,
            `${duelWinner} målar en tunnel på en bergsvägg och ${duelLoser} kör rakt in i den med bil`,
            `${duelWinner} skjuter ett snipergevär rakt på ${duelLoser}s kulor`,
            `${duelWinner} suger ${duelLoser} helt torr`,
        ];

        const resultatText = resultat[Math.floor(Math.random()* resultat.length)];

        await confirmation.reply({
          content: `${yourNickname} utmanar ${nickname} på duell... ${resultatText}!`,
          components: [],
          ephemeral: false,
        });
      } catch (e) {
        await interaction.editReply({
          content: `Bangade ur. ${e}`,
          components: [],
        });
      }
    } catch (e) {
      console.error(e);
      await interaction.followUp({
        content: "Tyvärr, min vän. Det uppstod ett fel.",
        ephemeral: true,
      });
    }
  },
};
