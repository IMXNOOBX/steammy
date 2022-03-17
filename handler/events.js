const {readdirSync} = require('fs')

module.exports = (client, log) => {

    const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let file of events) {
        var ev = require(`../events/${file}`);
        ev(client)
    }
    client.log.console('[BOT] | Events Loaded Sucessfully!');
}