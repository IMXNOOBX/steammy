
module.exports = (client) =>{ 
    client.on('communityMessages', function(count){
        if(count >= 0){
            client.log.error('[Steam] | You have a new moderator message.');
        }
    });
}
