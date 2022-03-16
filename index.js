const SteamUser = require('steam-user'); //https://www.npmjs.com/package/steam-user
const SteamCommunity = require('steamcommunity'); //https://www.npmjs.com/package/steamcommunity
const { Webhook } = require('dis-logs') //https://www.npmjs.com/package/dis-logs
const pass =  require('./data/data.json')
const config = require('./config.json')
const fs = require('fs');

const log = new Webhook(config.logWebhook);
let client = new SteamUser();
let community = new SteamCommunity();
console.clear();


console.log('[Bot] | Bot started!')
const logOnOptions = {
	accountName : pass.accountName,
	password : pass.password, 
	// twoFactorCode: pass.twoFactorCode //SteamTotp.generateAuthCode(pass.twoFactorCode) 
};

function clientLogin() {
    log.success('[Bot] | Logging in!');
		client.logOn(logOnOptions);
}
clientLogin();

/*---------------------------------[ LOGGED ON ]---------------------------------------*/
client.on('loggedOn', () => {
  client.getPersonas([client.steamID], (personas) => {
          log.success(`[Bot] | Logged as: ${client.accountInfo.name} - [${client.steamID}]`);  
         client.setPersona(SteamUser.EPersonaState.Online);
         /*client.gamesPlayed(
           [
             config.statusText, 
             730,252950,271590,322330,1091500,105600,460930,311210,635260,252490,218620,620,304390,440,447040,49520,346110,240,261640,50,220,400,380,420,500,550,203160,10,80,100,130,280,320,340
           ])*/
     });
 });

community.on('sessionExpired', (ERR) => {
    if (!ERR) {
      log.warn(`[Bot] | Session Expired. Relogging.`);
      client.webLogOn();
    }
});

client.on('webSession', function(steamID, cookies){
    community.setCookies(cookies);
    //client.gamesPlayed(config.statusText, true);
});

client.on('playingState', function (isInGame) {
  if (isInGame){
    log.success('[Bot] | User in game already');
    idler(false, false)
  }
  else if (isInGame == false && stopIdling == false){
    log.success('[Bot] | User not in game, starting to idle...');
    idler(true, true)
  }
});


//Command Handler like in discord made by nuv. its trass but works. im looking to update it :c

var hands = ['commands', 'events']
hands.forEach(handler => {
    require(`./handler/${handler}`)(client);
});