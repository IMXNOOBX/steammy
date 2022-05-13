
module.exports = (client) => {
    client.trade.on('newOffer', (offer) => {
        if (offer.itemsToGive.length == 0) {
            offer.accept((err, status) => {
                if (!err) {
                    client.log.success(`[Steam] | Accepted a trade. Status: ${status}.`);
                } else {
                    console.log(err);
                }
            });
        } else {
            offer.decline((err, status) => {
                if (!err) {
                    client.log.warn(`[Steam] | Declined a trade. Status: ${status}`);
                } else {
                    console.log(err);
                }
            });
        }
    });
}
