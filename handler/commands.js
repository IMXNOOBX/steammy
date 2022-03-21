const {readdirSync} = require('fs')

module.exports = async (client) => {
    const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const command = require(`../commands/${commandFile}`);
        try {
            command(client)
        }
        catch (err) {
            client.log.error(err)
        };
        // log(`[Bot] | Loaded Command: ${commandFile}`);
    }
    client.log.console('[BOT] | Commands Loaded Sucessfully!');
}