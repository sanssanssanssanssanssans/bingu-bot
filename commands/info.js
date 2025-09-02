const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('설명')
        .setDescription('봇이 무엇을 하는지 알려줍니다'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('ㅎㅇ!')
            .setDescription('노예 빙구봇이에요....')
            .addFields(
                { name: '🔹 하고 싶은거', value: `양식봇 씹어먹기 ㅋ`, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ content: '', embeds: [embed] });
    }
};