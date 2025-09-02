const { prefix } = require("../prefix.json");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = message.client.messageCommands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      await message.reply("❌ 명령어 실행 중 오류가 발생했습니다.");
    }
  }
};
