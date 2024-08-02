const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nyttnamn')
		.setDescription('du får ett nytt namn'),
	async execute(interaction) {
		try {
            await interaction.deferReply();

            const fetch = (await import('node-fetch')).default;
            
            const response = await fetch('https://hebisapi.onrender.com/random?category=nickname');
            const data = await response.json();
            const newNickname = data.response.entry[0].entry; // Access the "entry" property

            await interaction.member.setNickname(newNickname);
            await interaction.followUp(`Ditt nya namn är: ${newNickname}`);
        } catch (e) {
            console.error(e);
            await interaction.reply('Tyvärr, min vän. Det uppstod ett fel.');
        }
	},
};
