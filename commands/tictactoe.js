const { SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction } = require("discord.js");
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    data : new SlashCommandBuilder()
    .setName("틱택토")
    .setDescription("틱택토 게임을 하빈다.")
    .addUserOption(option => 
        option.setName("유저")
        .setDescription("유저를 고르세요!")
        .setRequired(true)
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
       
        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: false,
            opponent: interaction.options.getUser("유저").first(),
            embed: {
                title: '틱택토',
                color: '#5865F2',
                statusTitle: '진행 상황',
                overTitle: '게임 오버'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} |  **{player}**님 턴이에요!',
            winMessage: '{emoji} | **{player}**님이 이기셨어요!',
            tieMessage: '게임이 비겨서 아무도 이기지 못했어요!',
            timeoutMessage: '시간 초과! 아무도 이기지 못했어요!',
            playerOnlyMessage: '오직 {player} 님과 {opponent}님만 버튼들을 사용할 수 있어요!'
        });

        Game.startGame();
        Game.on('gameOver', result => {
            console.log(result);  // =>  { result... }
        });
    }
}