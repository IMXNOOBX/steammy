const SteamUser = require('steam-user');

module.exports = (client) =>{ 
    client.on("error", function(err){
        if (err.eresult == SteamUser.EResult.InvalidPassword)
        {
            client.log.error("[Steam] | Login Denied - User or Password Wrong."); 
        }
        else if (err.eresult == SteamUser.EResult.AlreadyLoggedInElsewhere)
        {
            client.log.error("[Steam] | Login Denied -  Already logged in!");         
        }
        else if (err.eresult == SteamUser.EResult.AccountLogonDenied)
        {
            client.log.error("[Steam] | Login Denied - SteamGuard is required");        
        }
        else {
            client.log.error("[Steam] | Unknown Error: " + err);
        } // all errors will log out our bot.

        // client.webLogOn();
        client.auth.clientLogin(client);
    });
}
  