const { SlashCommandBuilder } = require('discord.js');
const loadData = require('../util/loadJson');
const saveData = require('../util/saveJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('도박')
        .setDescription('빙구봇으로 도박을 합니다.')
        .addIntegerOption(option =>
            option.setName('돈')
                .setDescription('도박을 하기 위한 돈을 내세요!')
                .setRequired(true)
        ),
    async execute(interaction) {
        const userId = interaction.user.id;
        const amount = interaction.options.getInteger('돈');
        const userData = loadData();

        if (!userData[userId]) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 도박 실패",
                    description: "가입되지 않은 사용자입니다!",
                    color: 0xFF0000
                }]
            });
            return;
        }

        if (amount <= 0 || userData[userId].balance < amount) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 도박 실패",
                    description: "올바른 금액을 입력하세요! (잔액 부족)",
                    color: 0xFF0000
                }]
            });
            return;
        }

        const outcomes = ["2배", "5배", "-2배"];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];

        if (result === "2배") {
            userData[userId].balance += amount * 2;
        } else if (result === "5배") {
            userData[userId].balance += amount * 5;
        } else {
            userData[userId].balance -= amount * 2;
        }

        saveData(userData);

        await interaction.reply({
            embeds: [{
                title: "🎲 도박 결과",
                description: `결과: **${result}**\n현재 잔액: ${userData[userId].balance}원`,
                color: result === "-2배" ? 0xE74C3C : 0xF1C40F
            }]
        });
    }
};
