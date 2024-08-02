const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		if (message.author.bot) return;

		try {
			const messageContent = message.content.toLowerCase();
            
            if (messageContent.includes('svidde')) {
                message.react('<:svidde:768197875652886560>')
            }



		} catch (error) {
			console.error(error);

		}
	},
};