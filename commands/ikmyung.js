const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('익명')
        .setDescription('익명으로 메세지를 보내요.')
        .addStringOption(option => 
            option.setName('메세지')
              .setDescription('보낼 익명 메시지')
              .setRequired(true)
          ),
    async execute(interaction) {
        const message = interaction.options.getString('메세지');
        await interaction.reply("a");
        const userMessage = await interaction.fetchReply();
        if (userMessage) {
            await userMessage.delete(); 
        }
        await interaction.channel.send(`익명: ${message}`);
        await interaction.reply({ content: '메시지가 익명으로 전송되었습니다!', ephemeral: true }); 
    }
};
