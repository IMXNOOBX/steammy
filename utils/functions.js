// const SteamUser = require('steam-user');
// const client = SteamUser;

// I need an efective way to import the "client" variable here 

class func {

  static commentUser(client, SteamID) {
    //logg.send(`Got comment function, UserId: ${SteamID}`)
    client.community.getSteamUser(SteamID, (err, user) => {
      if (err) {
        client.log.error(
          `An error occurred while getting user profile: Usually private. \nSteam Response: ${err}`,
        );
      } else {
        user.comment(client.config.messages.commentText || 'Signed by github.com/IMXNOOBX/steammy', (err) => { // Steam Response: Error: Unknown error
          if (err) {
            client.log.error(
              `An error occurred while commenting on user profile: comments disabled for any reason. \nSteam Response: ${err}`
            );
          }
        });
        // client.community.postUserComment(SteamID, client.config.messages.commentText  || 'Signed by github.com/IMXNOOBX/steammy', (err) => { // Steam Response: Error: Unknown error
        //   if (err) {
        //     client.log.error(
        //       `An error occurred while commenting on user profile: comments disabled for any reason. \nSteam Response: ${err}`
        //     );
        //   }
        // })
      }
    });
    return;
  }

  static idler(client, shalStop, setOnline = null, addedGame = null) {
    let gamesPlayedArray = client.config.other.idleGames;
    if (setOnline) {
      client.setPersona(1); // SteamUser.EPersonaState.Online
    }
    if (!shalStop) {
      // client.gamesPlayed(client.config.statusText + ' | Afk');
      client.gamesPlayed();
    }
    else if (shalStop) {
      if (gamesPlayedArray.lenght > 23) { // max 25 but to be sure lets keep it in 23
        return console.log('Max amount of games allowed passed')
      }
      if (addedGame) gamesPlayedArray.push(addedGame);
      if (!gamesPlayedArray.includes(client.config.statusText)) gamesPlayedArray.unshift(client.config.statusText) // https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
      client.gamesPlayed(gamesPlayedArray);
    }
  }
};

module.exports = func;