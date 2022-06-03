const SteamUser = require('steam-user');

module.exports = (client) =>{ 
    var lastError = ''
    client.on("error", function(err){
        if (lastError == err) return;
        lastError = err;
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
        client.log.error("[Steam] | Loging back in 15s to avoid RateLimit...");
        setTimeout(() => {
            client.auth.clientLogin(client);
        }, 15000);
    });
}
  