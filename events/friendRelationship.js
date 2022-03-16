const SteamUser = require('steam-user');
const config = require('../config.json');

module.exports = (client, community, logg) =>{ 
    client.on('friendRelationship', function(sid, relationship) {
        community.getSteamUser(sid, (err, user) => {
            if (err) {
              return logg.sendErr(
                `[Steam] | Error checking current friend relationship with new customer: ${err}`,
              );
            }
            if (relationship === 2) {
              logg.send(
                `[Steam] | ${user.name} > ${sid.getSteamID64()} - SteamID`,
              );
              client.addFriend(sid);
              client.chatMessage(sid, config.other.quote + config.messages.welcomeMessage);
              client.chatMessage(sid, config.other.pre + config.messages.firstMessage);
            } else if (relationship === 3) {
              if (config.other.groupID) {
                client.inviteToGroup(sid, config.other.groupID);
              }
            }
            if (relationship == SteamUser.EFriendRelationship.None) {
              logg.sendWarn(`[Steam] | User id: ${user.name} has deleted us from their friendlist.\nUrl: https://steamcommunity.com/profiles/${sid.getSteamID64()}/`);
            }
          });
    });
}