const SteamUser = require('steam-user');
const config = require('../config.json');

// module.exports = (client, community, logg) =>{ 
//     client.on('communityMessages', function(count){
//         if(count >= 0){
//             logg.sendErr('[Steam] | You have a new moderator message.');
//         }
//     });
// }

module.exports.run = (client, community, logg, count) =>{ 
        if(count >= 0){
            logg.sendErr('[Steam] | You have a new moderator message.');
        }
}