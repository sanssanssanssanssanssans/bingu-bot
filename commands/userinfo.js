const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const loadData = require('../util/loadJson');
const saveData = require('../util/saveJson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('유저정보')
        .setDescription('로그인한 유저의 정보를 확인합니다.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const userId = interaction.user.id;
        const userData = loadData();

        if (!userData[userId]) {
            await interaction.reply({
                embeds: [{
                    title: "❌ 조회 실패",
                    description: "가입 하지 않으셨어요!",
                    color: 0xFF0000
                }]
            });
            return;
        }
        
        const info = userData[userId];
        await interaction.reply({
            embeds : [{
                title : `${interaction.user.username}님의 유저 정보`,
                fields :[{
                    name : "잔액",
                    value : `${info.balance}원`,
                    inline : false,
                }],
                color : 0x3498DB
            }]
        });
    }
};
