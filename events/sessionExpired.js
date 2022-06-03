
module.exports = (client) => {
    client.community.on('sessionExpired', (err) => {
        // if (!err) {
          client.log.warn(`[Bot] | Session Expired. Relogging.`);
          client.webLogOn();
        // }
    });
}
