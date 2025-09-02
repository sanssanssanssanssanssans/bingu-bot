const { SlashCommandBuilder } = require('discord.js');
const loadData = require('../util/loadJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('랭킹')
        .setDescription('빙구봇 돈 랭킹을 확인합니다!'),
    async execute(interaction) {
        const userData = loadData();
        
        if (!Object.keys(userData).length) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 랭킹 확인 실패",
                    description: "아직 등록된 사용자가 없습니다! `/회원가입`으로 가입하세요!",
                    color: 0xFF0000
                }]
            });
            return;
        }

        const sortedUsers = Object.entries(userData)
            .sort(([, a], [, b]) => b.balance - a.balance)
            .slice(0, 10);

        const embed = {
            title: "💰 빙구봇 랭킹",
            color: 0x3498DB,
            fields: sortedUsers.map(([userId, data], index) => ({
                name: `#${index + 1} ${userId}`,
                value: `잔액: ${data.balance}원`,
                inline: false
            }))
        };

        await interaction.reply({ embeds: [embed] });
    }
};
