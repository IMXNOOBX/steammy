const {readdirSync} = require('fs')

module.exports = (client) => {
    const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const command = require(`../commands/${commandFile}`);
        command(client);
        // log(`[Bot] | Loaded Command: ${commandFile}`);
    }
    client.log.console('[BOT] | Commands Loaded Sucessfully!');
}