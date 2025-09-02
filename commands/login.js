const { SlashCommandBuilder } = require('discord.js');
const loadData = require('../util/loadJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('로그인')
        .setDescription('빙구봇 시스템에 로그인합니다.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const userData = loadData();
        
        if (!userData[userId]) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 로그인 실패",
                    description: "가입되지 않은 사용자입니다. `/회원가입`을 먼저 해주세요.",
                    color: 0xFF0000
                }]
            });
            return;
        }

        await interaction.reply({
            embeds: [{
                title: "✅ 로그인 성공",
                description: "로그인되었습니다.",
                color: 0x00FF00
            }]
        });
    }
};
