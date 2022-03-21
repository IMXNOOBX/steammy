
const SID64REGEX = new RegExp(/^[0-9]{17}$/);

module.exports = (client) =>{ 
    client.on("friendMessage", function(user, msg, type){
        msg = msg.toLowerCase();

        if(user == client.config.adminSteamID64s[0]){ //admin commands >---------------------------------------------------------------
            if (msg == "!help-admin") {
                client.chatMessage(user, "/pre Admin Commands");
                client.chatMessage(user, `/code 
1- Type !block <steamID> to block a user from the bot
2- Type !refresh to refresh the bot
3- Type !restart to restart the bot
4- Type !stop to stop the bot
5- Type !idle <gameID> to start idling a game
6- Type !idler <start/stop> to set up
                `);
            }
            if (msg.indexOf("!block") >= 0) {   //if (msg.toLowerCase().indexOf("!block") >= 0) {
                let n = msg.toLowerCase().replace("!block ", "").toString();
                if (SID64REGEX.test(n)) {
                    client.chatMessage(user, "/me ✔️ User blocked.");
                    client.blockUser(n);
                    client.removeFriend(n);
                    client.log.warn("[admin] | User "+ n +" has been blocked");
                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid SteamID64");
                    client.log.error("[admin] | Error blocking "+ n +" user");
                }
            }
            if (msg.indexOf("!unblock") >= 0) {
                let n = msg.toLowerCase().replace("!unblock ", "").toString();
                if (SID64REGEX.test(n)) {
                    client.chatMessage(user, "/me ✔️ User unblocked.");
                    client.unblockUser(n);
                    client.log.warn("[admin] | User "+ n +" has been unblocked");
                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid SteamID64");
                    client.log.error("[admin] | Error unblocking "+ n +" user");
                }
            }
            if (msg == "!refresh") {
                client.log.success('[admin] | Refreshing the bot...');
                client.chatMessage(user, '/me [admin] | Refreshing the bot...');
                client.setPersona(1);
            }
            if (msg == "!restart") {
                client.log.warn('[admin] | Restarting the bot...');
                client.chatMessage(user, '/me [admin] | Restarting the bot...');
                client.logOff();
                client.log.warn('[admin] | Logged off... Waiting 15 sec for exceed limit');
                setTimeout(() => {
                    clientLogin();
                }, 15000);
            }
            if (msg == "!stop") {
                client.log.warn('[admin] | Received forcestop command, exiting...');
                client.chatMessage(user, '/me [admin] | Received forcestop command, exiting...');
                client.logOff();
            }
            //BETA FEATURE
            if (msg.indexOf("!idler") >= 0) {
            let n = msg.toLowerCase().replace("!idler ", "").toString();
                if (n == "start") {
                    client.functions.idler(client, true)
                    client.chatMessage(user, "/me ✔️ Started idling games!");
                    client.log.success("[admin] | Started idling service");

                }
                else if (n == "stop") {
                    client.functions.idler(client, false)
                    client.chatMessage(user, "/me ✔️ Stoped idling games!");
                    client.log.success("[admin] | Stoped idling service");

                }
                else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid <start/stop> option");
                }
            }
            else if (msg.indexOf("!idle") >= 0) {
            let n = msg.toLowerCase().replace("!idle ", "").toString();
                if (SID64REGEX.test(n)) {
                    client.functions.idler(client, true, true, n)
                    client.chatMessage(user, "/me ✔️ idling " + n);
                    client.log.success("[admin] | idling \""+ n +"\" has been added to farm list");

                } else {
                    client.chatMessage(user, "/pre ⚠️ Please provide a valid game ID");
                    client.log.error("[admin] | Error idling \""+ n +"\" gameID");
                }
            }
        }
    });
}