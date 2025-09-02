const { SlashCommandBuilder } = require('discord.js');
const loadData = require('../util/loadJson');
const saveData = require('../util/saveJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('회원가입')
        .setDescription('빙구봇 시스템에 회원가입합니다.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const userData = loadData();

        if (userData[userId]) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 회원가입 실패",
                    description: "이미 가입된 회원입니다!",
                    color: 0xFF0000
                }]
            });
            return;
        }

        userData[userId] = {
            balance: 20000,
            last_check_in: null
        };
        saveData(userData);

        await interaction.reply({
            embeds: [{
                title: "✅ 회원가입 성공",
                description: "회원가입이 완료되었습니다! 초기 보너스 **2만원을 드렸어요!**",
                color: 0x00FF00
            }]
        });
    }
};
