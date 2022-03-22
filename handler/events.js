const { readdirSync } = require('fs')

module.exports = async (client) => {

    const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let file of events) {
        var ev = require(`../events/${file}`);
        try {
            ev(client)
        }
        catch (err) {
            client.log.error(err)
        };
    }
    client.log.console('[BOT] | Events Loaded Sucessfully!');
}