module.exports = (client) => {
    client.on('loggedOn', () => {
        client.getPersonas([client.steamID], (personas) => {
            client.log.success(`[Bot] | Logged as: ${client.accountInfo.name} - [${client.steamID}]`);

        });
    });
}
