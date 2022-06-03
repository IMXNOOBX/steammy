module.exports = (client) => {
    client.on('loggedOn', () => {
        client.getPersonas([client.steamID], (personas) => {
            client.log.success(`[Bot] | Logged as: ${client.accountInfo.name} - [${client.steamID}]`);
        });

        if (client.isInGame) {
            client.log.console('[Bot] | User in game already');
            client.functions.idler(client, false, false)
        }
        else {
            client.log.console('[Bot] | User not in game, starting to idle...');
            client.functions.idler(client, true, true)
        }
    });
}
