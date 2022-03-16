const {readdirSync} = require('fs')

module.exports = (client, log) => {

    const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let file of events) {

        try {
            let ev = require(`../events/${file}`);

            if (ev.event && typeof ev.event !== 'string') {
                continue;
            }

            ev.event = ev.event || file.replace('.js', '')
            client.on(ev.event, (null, client))
        } catch(err) {
            console.error('[BOT] | Error While loading: ' + file + '\nDiscord Response: ' + err);
        }
    }
    console.log('[BOT] | Events Loaded Sucessfully!');
}