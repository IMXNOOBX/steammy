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


// function clientLogin() {
//      // client.log.success('[Bot] | Logging in!');
// 		client.logOn(logOnOptions);
// }

/*---------------------------------[ LOGGED ON ]---------------------------------------*/
// client.on('loggedOn', () => {
//   client.getPersonas([client.steamID], (personas) => {
//     client.log.success(`[Bot] | Logged as: ${client.accountInfo.name} - [${client.steamID}]`);  
//         client.setPersona(SteamUser.EPersonaState.Online);
//          /*client.gamesPlayed(
//            [
//              config.statusText, 
//              730,252950,271590,322330,1091500,105600,460930,311210,635260,252490,218620,620,304390,440,447040,49520,346110,240,261640,50,220,400,380,420,500,550,203160,10,80,100,130,280,320,340
//            ])*/
//      });
//  });

// community.on('sessionExpired', (err) => {
//     if (!err) {
//       client.log.warn(`[Bot] | Session Expired. Relogging.`);
//       client.webLogOn();
//     }
// });

// client.on('webSession', function(steamID, cookies){
//     community.setCookies(cookies);
// });

// client.on('playingState', function (isInGame) {
//   if (isInGame){
//     client.log.console('[Bot] | User in game already');
//     client.functions.idler(client, false, false)
//   }
//   else if (!isInGame){
//     client.log.console('[Bot] | User not in game, starting to idle...');
//     client.functions.idler(client, true, true)
//   }
// });

// client.community.editProfile({
//     'name': username,
//     "background": randomBG,
//     "customURL": randomURL,
// }).catch(err => {
//     client.log.error('[BOT] | Error wile eiting the profile' + err)
// });


// Command Handler like in discord made by nuv. its trass but works. im looking to update it :c

var hands = ['commands', 'events']
hands.forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.auth.clientLogin(client);