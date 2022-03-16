const SteamUser = require('steam-user');
const config = require('../config.json');

// module.exports = (client, community, logg) =>{ 
//     client.on("error", function(err){
//         if (err.eresult == SteamUser.EResult.InvalidPassword)
//         {
//             logg.sendErr("[Steam] | Login Denied - User or Password Wrong."); 
//         }
//         else if (err.eresult == SteamUser.EResult.AlreadyLoggedInElsewhere)
//         {
//             logg.sendErr("[Steam] | Login Denied -  Already logged in!");         
//         }
//         else if (err.eresult == SteamUser.EResult.AccountLogonDenied)
//         {
//             logg.sendErr("[Steam] | Login Denied - SteamGuard is required");        
//         }
//         else {
//             logg.sendErr("[Steam] | Unknown Error: \n" + err);
//         }
//     });
// }

module.exports.run = async (error, client) => {
    console.error(`[BOT] | Client's WebSocket Error: ${error}`);   
}    