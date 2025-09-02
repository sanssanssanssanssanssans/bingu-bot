const { SlashCommandBuilder } = require('discord.js');
const loadData = require('../util/loadJson');
const saveData = require('../util/saveJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('출석')
        .setDescription('출석 보상을 받습니다.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const userData = loadData();

        if (!userData[userId]) {
            return interaction.reply({
                embeds: [{
                    title: "❌ 출석 실패",
                    description: "가입되지 않은 사용자입니다.",
                    color: 0xFF0000
                }]
            });
        }

        const now = new Date();
        const lastCheckIn = userData[userId].last_check_in;

        if (lastCheckIn && (new Date(lastCheckIn)).getDate() === now.getDate()) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 출석 실패",
                    description: "출석 보상은 하루에 한 번만 받을 수 있습니다.",
                    color: 0xFF0000
                }]
            });
            return;
        }

        userData[userId].balance += 50000;
        userData[userId].last_check_in = now.toISOString();
        saveData(userData);

        return interaction.reply({
            embeds: [{
                title: "✅ 출석 성공",
                description: "출석 보상으로 **5만원**을 받았습니다.",
                color: 0x00FF00
            }]
        });
    }
};
