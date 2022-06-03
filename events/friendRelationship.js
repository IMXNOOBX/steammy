const SteamUser = require('steam-user');

module.exports = (client) => {
  client.on('friendRelationship', function (sid, relationship) {
    client.community.getSteamUser(sid, (err, user) => {
      if (err) {
        return client.log.error(
          `[Steam] | Error on friendRelationship request: ${err}`,
        );
      }
      if (relationship === 2) {
        client.log.send(
          `[Steam] | Added as friends: ${user.name} (${sid.getSteamID64()}) - SteamID`,
        );
        client.addFriend(sid);
        client.chatMessage(sid, client.config.other.quote + client.config.messages.welcomeMessage);
        client.chatMessage(sid, client.config.other.pre + client.config.messages.firstMessage);
      } else if (relationship === 3) {
        if (client.config.other.groupID) {
          client.chatMessage(sid, "/me [J4J] Join for Join, I will join your group automaticaly when you join mine");
          client.chatMessage(sid, "/pre Check your group invites here:\n" + `https://steamcommunity.com/profiles/${user}/groups/pending`);
          client.inviteToGroup(sid, client.config.other.groupID);
        }
      }
      else if (relationship == 0) { // SteamUser.EFriendRelationship.None
        client.log.warn(`[Steam] | User id: ${user.name} has deleted us from their friendlist.\nUrl: https://steamcommunity.com/profiles/${sid.getSteamID64()}/`);
      }
    });
  });
}