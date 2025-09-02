const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('도움말')
        .setDescription('빙구봇 도움말을 보여줘요.')
        .addStringOption(option => 
            option.setName('선택지')
              .setDescription('무슨 주제로 도움말을 보여줄지 골라주시면 됩니다.')
              .setChoices(
                    {name : "돈", value : "money"},
                    {name : "유틸", value : "util"},
                    {name : "관리", value : "admins"},
                    {name : "재미", value:"fun"},
                    {name:"기타", value : "gita"}
                )
              .setRequired(true)
          ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {    
        if (interaction.options.getString("선택지") === "money") {
            const embed = new EmbedBuilder() 
            .setColor("Blurple")
            .setTitle("빙구봇 돈 관련 커맨드!")
            .setTimestamp()
            .addFields({
                name : "출석",
                value : "24시간마다 돈을 받을 수 있어요.",
                inline : true
            },{
                name : "도박",
                value : "돈을 걸어 도박을 해보세요!"
                ,
                inline : true
            },{
                name : "회원가입",
                value : "돈 시스템을 즐기기 위한 회원 가입을 해요!",
                inline : true
            },{
                name : "로그인",
                value : "빙구봇에 로그인 해보세요!",
                inline : true
            },{
                name : "랭킹",
                value : "빙구봇 돈 랭킹을 알려줘요!",
                inline : true
            },{
                name : "유저정보",
                value : "유저의 정보를 확인하세요!",
                inline : true
            });
            await interaction.reply({embeds:[embed]});
        } else if (interaction.options.getString("선택지") === "util") {
            const embed = new EmbedBuilder() 
            .setColor("Blurple")
            .setTitle("빙구봇이 유저분들에게 도움을 주는 커맨드!")
            .setTimestamp()
            .addFields({
                name : "아바타",
                value : "유저의 아바타를 보게 해줘요.",
                inline : true
            },{
                name : "픽시브",
                value : "빙구의 픽시브에 들어가 보양식 야짤을 보세요! ㅇㅈㅇㅈ",
                inline : true
            },{
                name : "이진법",
                value : "특정 문자를 이진법으로 변환, 또는 해독을 해요!",
                inline : true
            },{
                name : "캡션",
                value : "이미지에 텍스트를 써줘요!",
                inline : true
            },{
                name : "고양이",
                value : "랜덤으로 고양이 사진을 가져옵니다!",
                inline : true
            },{
                name : "끝말잇기 단어-검색",
                value : "빙구봇 사전에서 단어를 검색해줘요!",
                inline : true
            },{
                name : "끝말잇기 긴단어-검색",
                value : "빙구봇 사전에서 긴단어를 검색해줘요!",
                inline : true
            },{
                name : "괄호",
                value : "괄호의 수식쌍이 올바른지 체크 해줘요!",
                inline : true
            },{
                name : "익명",
                value : "익명으로 메세지를 보내줘요!",
                inline : true
            },{
                name : "애니",
                value : "라프텔에서 애니를 보여줘요!",
                inline : true
            },{
                name : "마크스킨",
                value : "마크 유저닉으로 스킨을 불러와요!",
                inline : true
            },{
                name : "모스부호",
                value : "특정 단어를 모스부호로 바꿔줘요!, 다만, 한국어는 불가능 해요..",
                inline : true
            },{
                name : "골라",
                value : "빙구봇이 대신 골라줘요!",
                inline : true
            },{
                name : "핑",
                value : "퐁!",
                inline : true
            },{
                name : "로블그룹",
                value : "로블록스 그룹 아이디로, 그룹의 정보를 불러와요!",
                inline : true
            },{
                name : "로블유저",
                value : "로블 유저를 가지고 와요!",
                inline : true
            },{
                name : "스팀",
                value : "스팀 아이디로 스팀 게임 정보를 불러와요!",
                inline : true
            },{
                name : "번역",
                value : "빙구봇이 번역을 해줘요!",
                inline : true
            });
            await interaction.reply({embeds:[embed]});
        } else if (interaction.options.getString("선택지") === "admins") {
            const embed = new EmbedBuilder() 
            .setColor("Blurple")
            .setTitle("빙구봇 관리 관련 커맨드!")
            .setTimestamp()
            .addFields({
                name : "벤",
                value : "유저를 벤해줘요.",
                inline : true
            },{
                name : "청소",
                value : "1부터 100까지의 범위를 가진, 메세지들을 청소해줘요!",
                inline : true
            },{
                name : "타임아웃",
                value : "특정 유저를 타임아웃 해줘요!",
                inline : true
            });
            await interaction.reply({embeds:[embed]});
        } else if (interaction.options.getString("선택지") === "fun") {
            const embed = new EmbedBuilder() 
            .setColor("Blurple")
            .setTitle("빙구봇 재미 관련 커맨드!")
            .setTimestamp()
            .addFields({
                name : "지뢰찾기",
                value : "지뢰찾기 게임을 해요!",
                inline : true
            },{
                name : "뱀",
                value : "스네이크 게임을 해요!",
                inline : true
            },{
                name : "틱택토",
                value : "특정 유저랑 틱택토를 해요!",
                inline : true
            });
            await interaction.reply({embeds:[embed]});
        } else {
            const embed = new EmbedBuilder() 
            .setColor("Blurple")
            .setTitle("빙구봇 기타 커맨드!")
            .setTimestamp()
            .addFields({
                name : "와이프",
                value : "가상 와이프 사진을 올려줘요!",
                inline : true
            },{
                name : "와이프2",
                value : "**인간의 삼대 욕구를 책임져 줍니다. ** (NSFW ONLY)",
                inline : true
            });
            await interaction.reply({embeds:[embed]});
        }

    }
};
