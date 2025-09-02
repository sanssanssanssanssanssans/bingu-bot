const fs = require('fs');
const path = require('path');

class SlashCommandCog {
    static loadCommands(client, commandsPath) {
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            client.commands.set(command.data.name, command);
        }
    }
}

module.exports = SlashCommandCog;
