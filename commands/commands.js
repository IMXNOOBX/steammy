
const config = require('../config.json');

module.exports = (client, community, logg, clientLogin, commentUser) =>{ 
    client.on("friendMessage", function(user, msg, type){
        msg = msg.toLowerCase();
        if (msg == "!help") { //User Commands >------------------------------------------------------------------
            client.chatMessage(user, "/pre Main Commands");
            client.chatMessage(user, `/code 
1- Type !comment for +rep on your profile
2- Type !group to be invited to the group
3- Type !test to test the chat messages
            `);
        }
        if(msg == "!comment"){ //This will comvert the message to MAYUS and it will detect the comands like: Hello hello, HeLlO 
            client.chatMessage(user, config.other.me + "Commenting in your profile!");
            //logg.send(`Commentig 1st to: ${user}`)
            commentUser(user)
        }
        if(msg == "hello"){ 
            client.chatMessage(user, config.other.me + "Hello! Im a bot!");
        }
        if (msg == "!group") {
            logg.sendSuccess("[Steam] | "+ user + " has been invited to " + config.other.groupID); //--> looks like doesnt get the log function!!!!!! //now does :D
            client.chatMessage(user, "https://steamcommunity.com/groups/itsxnoobx");
            client.inviteToGroup(user, config.other.groupID);
            client.chatMessage(user, "/pre Check your group invites here:\n" + `https://steamcommunity.com/profiles/${user}/groups/pending`);
        //} else {
            //client.chatMessage(steamID, "/quote Looks like you are already in the group!");
        //};
        }
    });
}
