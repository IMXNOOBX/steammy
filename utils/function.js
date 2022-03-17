const SteamUser = require('steam-user');
const client = SteamUser;
let stopIdling = false;
class func {

    static commentUser(SteamID) {
        //logg.send(`Got comment function, UserId: ${SteamID}`)
        community.getSteamUser(SteamID, (err, user) => {
            if (err) {
                logg.sendErr(
                `An error occurred while getting user profile: Usually private. \nSteam Response: ${err}`,
                );
            } else {
                user.comment(config.commentText, (err) => {
                if (err) {
                    logg.sendErr(
                    `An error occurred while commenting on user profile: comments disabled for any reason. \nSteam Response: ${err}`
                    );
                }
                });
            }
        });
        return;
    }

    static idler(shalStop, setOnline = null, addedGame = null){
        if (setOnline == true){
          client.setPersona(SteamUser.EPersonaState.Online);
        }
        else if (setOnline == false){
          client.setPersona(SteamUser.EPersonaState.Offline);
        }
        if (shalStop == false) {
          client.gamesPlayed(config.statusText + ' | Afk');
          stopIdling = true
        }
        else if (shalStop == true){
          client.gamesPlayed(
            [
              config.statusText,
              730,/*csgo*/ 
              677620,/*split gate*/
              236390,/*war thunder*/ 
              552990,/*world of warships */ 
              1407200,/*world of tanks*/ 
              230410,/*warframe*/
              386180,/*crossout*/
              440,/*tf2*/
              /*570,Dota2*/
              //addedGame
            ]);
        }
      }
};

module.exports = func;