require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const SlashCommandCog = require('./util/SlashCommandCog');
const { getData } = require('./util/garu');
const queue = new Map();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildBans,
        
    ]
});


module.exports = {queue};

client.commands = new Collection();
SlashCommandCog.loadCommands(client, path.join(__dirname, 'commands'));

client.chatcommands = new Collection();

const commandFiles = fs.readdirSync("./chatcommands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {1
    const command = require(`./chatcommands/${file}`);
    client.chatcommands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.TOKEN);
