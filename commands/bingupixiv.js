const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch').default;  // 수정된 부분

module.exports = {
    data: new SlashCommandBuilder()
        .setName('픽시브')
        .setDescription('Pixiv에서 빙구의 정보를 가져옵니다.'),
    async execute(interaction) {
        const userId = 111977870;

        await interaction.reply({
                embeds: [{
                    title: `📌 빙구 픽시브`,
                    description: `[프로필 보기](https://www.pixiv.net/user/${userId}) \n 봤으면 팔로우좀`,
                    color: 0x0096FA,
                }]
            });

    }
};
