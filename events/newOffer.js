
module.exports = (client) => {
    client.trade.on('newOffer', (offer) => {
        client.log.success(`[Steam] | New Trade Offer Detected! Automatic Actions ${client.config.acceptTradeGifts ? 'Enabled' : 'Disabled'}`);
        if (!client.config.acceptTradeGifts) return;
        if (offer.itemsToGive.length == 0) {
            offer.accept((err, status) => {
                if (!err) {
                    client.log.success(`[Steam] | Accepted a trade. Status: ${status}.`);
                } else {
                    client.log.error(err);
                }
            });
        } else {
            offer.decline((err, status) => {
                if (!err) {
                    client.log.warn(`[Steam] | Declined a trade. Status: ${status}`);
                } else {
                    client.log.error(err);
                }
            });
        }
    });
}
