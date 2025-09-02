const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('현재 봇의 응답 속도(Ping)를 확인합니다.'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const botPing = interaction.client.ws.ping; 
        const sent = await interaction.reply({ content: '🏓 측정 중...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp; 

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🏓 Pong!')
            .setDescription('현재 봇의 응답 속도를 확인합니다.')
            .addFields(
                { name: '🔹 웹소켓 핑', value: `\`${botPing}ms\``, inline: true },
                { name: '🔹 응답 속도', value: `\`${latency}ms\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: '핑 정보', iconURL: interaction.client.user.displayAvatarURL() });

        await interaction.editReply({ content: '', embeds: [embed] });
    }
};
