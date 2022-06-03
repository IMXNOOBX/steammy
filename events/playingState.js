
module.exports = (client) => {
    client.on('playingState', function (isInGame) { // it sends the event before and afater login
        client.isInGame = isInGame;
        // if (isInGame) {
        //     client.log.console('[Bot] | User in game already');
        //     client.functions.idler(client, false, false)
        // }
        // else {
        //     client.log.console('[Bot] | User not in game, starting to idle...');
        //     client.functions.idler(client, true, true)
        // }
    });
}
