const SteamUser = require('steam-user');

module.exports = (client) =>{ 
    client.on('friendRelationship', function(sid, relationship) {
        community.getSteamUser(sid, (err, user) => {
            if (err) {
              return client.log.error(
                `[Steam] | Error checking current friend relationship with new customer: ${err}`,
              );
            }
            if (relationship === 2) {
              client.log.send(
                `[Steam] | ${user.name} > ${sid.getSteamID64()} - SteamID`,
                );
              client.addFriend(sid);
              client.chatMessage(sid, client.config.other.quote + client.config.messages.welcomeMessage);
              client.chatMessage(sid, client.config.other.pre + client.config.messages.firstMessage);
            } else if (relationship === 3) {
              if (client.config.other.groupID) {
                client.inviteToGroup(sid, client.config.other.groupID);
              }
            }
            else if (relationship == 0) { // SteamUser.EFriendRelationship.None
              client.log.warn(`[Steam] | User id: ${user.name} has deleted us from their friendlist.\nUrl: https://steamcommunity.com/profiles/${sid.getSteamID64()}/`);
            }
          });
    });
}