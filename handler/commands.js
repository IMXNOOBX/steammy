const {readdirSync} = require('fs')

module.exports = (client, log) => {
    const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const command = require(`../commands/${commandFile}`);
        command(client);
        // log(`[Bot] | Loaded Command: ${commandFile}`);
    }
}