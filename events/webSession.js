module.exports = (client) => {
    client.on('webSession', function (steamID, cookies) {
        client.community.setCookies(cookies);
        client.trade.setCookies(cookies);
    });
}
