
module.exports = (client) => {
    client.on('playingState', function (isInGame) {
        if (isInGame) {
            // client.log.console('[Bot] | User in game already');
            // client.functions.idler(client, false, false)
            client.isInGame = true;
        }
        else {
            // client.log.console('[Bot] | User not in game, starting to idle...');
            // client.functions.idler(client, true, true)
            client.isInGame = false;
        }
    });
}
