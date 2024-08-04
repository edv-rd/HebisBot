require('dotenv').config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

module.exports = {
  token,
  clientId,
  guildId
};