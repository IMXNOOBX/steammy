const SteamUser = require('steam-user'); // https://www.npmjs.com/package/steam-user
const SteamCommunity = require('steamcommunity'); // https://www.npmjs.com/package/steamcommunity
const TradeOfferManager = require('steam-tradeoffer-manager'); // https://www.npmjs.com/package/steam-tradeoffer-manager
const SteamTotp = require('steam-totp'); // https://www.npmjs.com/package/steam-totp
const { Webhook } = require('dis-logs') // https://www.npmjs.com/package/dis-logs
const auth = require('dotenv').config()
// const pass =  require('./data/data.json')
// const config = require('./config.json')
// const fs = require('fs');
console.clear();

let client = new SteamUser();
let community = new SteamCommunity();
let trade = new TradeOfferManager();

// client.data = require('./data/data.json');
client.config = require('./config.json');
client.functions = require('./utils/functions');
client.auth = require('./utils/auth');
client.log = new Webhook(client.config.logWebhook);
client.fs = require('fs');
client.community = community;
client.trade = trade;
client.otp = SteamTotp;
client.isInGame = false;

client.log.console('[Bot] | Bot started!')

// Command/Function Handler like in discord made by nuv. its trass but works. im looking to update it :c

var hands = ['commands', 'events']
hands.forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.auth.clientLogin(client);