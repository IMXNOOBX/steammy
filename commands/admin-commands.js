
const config = require('../config.json');
const SID64REGEX = new RegExp(/^[0-9]{17}$/);

module.exports = (client, community, logg, clientLogin, commentUser, idler) =>{ 
    client.on("friendMessage", function(user, msg, type){
        msg = msg.toLowerCase();
        if(user == config.adminSteamID64s[0]){ //admin commands >---------------------------------------------------------------
            if (msg == "!help-admin") {
                client.chatMessage(user, "/pre Admin Commands");
                client.chatMessage(user, `/code 
1- Type !block <steamID> to block a user from the bot
2- Type !refresh to refresh the bot
3- Type !restart to restart the bot
4- Type !stop to stop the bot
5- Type !idle <gameID> to start idling a game
6- Type !idler < /stop> to set up
                `);
            }
            //if (msg.startsWith("!BLOCK")) {
                if (msg.indexOf("!block") >= 0) {//if (msg.toLowerCase().indexOf("!block") >= 0) {
                let n = msg.toLowerCase().replace("!block ", "").toString();
                if (SID64REGEX.test(n)) {
                    client.chatMessage(user, "/me ✔️ User blocked.");
                    client.blockUser(n);
                    client.removeFriend(n);
                    logg.sendWarn("[admin] | User "+ n +" has been blocked");
                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid SteamID64");
                    logg.sendErr("[admin] | Error blocking "+ n +" user");
                }
            }
            if (msg.indexOf("!unblock") >= 0) {
                let n = msg.toLowerCase().replace("!unblock ", "").toString();
                if (SID64REGEX.test(n)) {
                    client.chatMessage(user, "/me ✔️ User unblocked.");
                    client.unblockUser(n);
                    logg.sendWarn("[admin] | User "+ n +" has been unblocked");
                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid SteamID64");
                    logg.sendErr("[admin] | Error unblocking "+ n +" user");
                }
            }
            if (msg == "!refresh") {
                logg.sendSuccess('[admin] | Refreshing the bot...');
                client.chatMessage(user, '/me [admin] | Refreshing the bot...');
                client.setPersona(1);
            }
            if (msg == "!restart") {
                logg.sendWarn('[admin] | Restarting the bot...');
                client.chatMessage(user, '/me [admin] | Restarting the bot...');
                client.logOff();
                logg.sendWarn('[admin] | Logged off... Waiting 15 sec for exceed limit');
                setTimeout(() => {
                    clientLogin();
                }, 15000);
            }
            if (msg == "!stop") {
                logg.sendWarn('[admin] | Received forcestop command, exiting...');
                client.chatMessage(user, '/me [admin] | Received forcestop command, exiting...');
                client.logOff();
            }
            //BETA FEATURE
            if (msg.indexOf("!idler") >= 0) {
            let n = msg.toLowerCase().replace("!idler ", "").toString();
                if (n == "start") {
                    idler(true)
                    client.chatMessage(user, "/me ✔️ Started idling games!");
                    logg.sendSuccess("[admin] | Started idling service");

                }
                else if (n == "stop") {
                    idler(false)
                    client.chatMessage(user, "/me ✔️ Stoped idling games!");
                    logg.sendSuccess("[admin] | Stoped idling service");

                }
                else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid <start/stop> option");
                }
            }
            if (msg.indexOf("!idle")) {
            let n = msg.toLowerCase().replace("!idle ", "").toString();
                if (SID64REGEX.test(n)) {
                    idler(true, true, n)
                    client.chatMessage(user, "/me ✔️ idling " + n);
                    logg.sendSuccess("[admin] | idling \""+ n +"\" has been added to farm list");

                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid game ID");
                    logg.sendErr("[admin] | Error idling \""+ n +"\" gameID");
                }
            }
        }
    });
}