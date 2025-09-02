const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('스팀')
    .setDescription('스팀 게임 정보를 가져옵니다.')
    .addIntegerOption(option =>
        option.setName('아이디')
            .setDescription('스팀 게임의 App ID를 입력하세요.')
            .setRequired(true)
    );

async function execute(interaction) {
    const app_id = interaction.options.getInteger('아이디');

    try {
        const api_url = `http://store.steampowered.com/api/appdetails?appids=${app_id}`;
        const response = await axios.get(api_url);
        const data = response.data;

        if (data[app_id].success) {
            const game_data = data[app_id].data;
            const releaseDate = new Date(game_data.release_date.date).toLocaleDateString('en-US', { timeZone: 'UTC' });

            await interaction.reply({
                content: '스팀 게임 정보 :',
                embeds: [
                    {
                        title: game_data.name,
                        url: `http://store.steampowered.com/app/${app_id}`,
                        description: game_data.short_description,
                        color: 0x00ff00,
                        thumbnail: { url: game_data.header_image },
                        fields: [
                            { name: '가격', value: game_data.price_overview?.final_formatted || 'N/A', inline: true },
                            { name: '발매일', value: releaseDate, inline: true },
                            { name: '메타크리틱 점수', value: game_data.metacritic?.score ? `${game_data.metacritic.score} / 100` : 'N/A', inline: true },
                        ],
                    },
                ],
            });
        } else {
            await interaction.reply("게임 정보를 찾을 수 없습니다.");
        }
    } catch (error) {
        console.error(error);
        await interaction.reply("오류가 발생했습니다.");
    }
}

module.exports = {
    data,
    execute,
};