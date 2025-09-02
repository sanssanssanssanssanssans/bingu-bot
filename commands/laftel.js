const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('애니')
        .setDescription('라프텔에서 애니를 검색 합니다.')
        .addStringOption(option =>
            option.setName('키워드')
                .setDescription('에니메이션 검색을 하기위한 키워드')
                .setRequired(true)),

    async execute(interaction) {

        const keyword = interaction.options.getString('키워드');

        try {
            const searchUrl = `https://laftel.net/api/search/v3/keyword/?keyword=${encodeURIComponent(keyword)}`;
            const searchResponse = await axios.get(searchUrl);
            const data = searchResponse.data;

            if (data.count === 0) {
                const embed = {
                    title: '검색 결과가 없습니다.',
                    description: '',
                    color: 0x816BFF
                };
                return await interaction.reply({ embeds: [embed] });
            }

            const anime = data.results[0];
            const animeId = anime.id;
            const detailUrl = `https://laftel.net/api/items/v2/${animeId}/`;
            const detailResponse = await axios.get(detailUrl);
            const animeDetails = detailResponse.data;

            const { name, img, content, awards, air_year_quarter, genres, avg_rating, is_viewing, is_avod } = animeDetails;

            let status = is_avod ? "방영종료" : "방영중";
            let viewingStatus = is_viewing ? "(시청가능)" : "(시청불가)";
            let genreList = genres.join(', ');

            const embed = {
                title: '',
                description: `[${name}](https://laftel.net/search?&modal=${animeId})`,
                color: 0x816BFF,
                author: {
                    name: 'laftel',
                    icon_url: 'https://cf.channel.io/thumb/200x200/file/7074/5e661af3185a0dd698b6/avatar-d652fe21a162f82ee8d60f025408b498'
                },
                thumbnail: {
                    url: img
                },
                fields: [
                    { name: "", value: content, inline: false },
                    { name: "별점", value: `${avg_rating}/5.0` },
                    { name: "방영분기", value: air_year_quarter },
                    { name: "장르", value: genreList },
                    { name: "상태", value: `${status} ${viewingStatus}` }
                ],
                footer: {
                    text: "Data based on NEXON Open API"
                }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Error while fetching anime data:", error);
            await interaction.reply("애니 검색 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }
};
