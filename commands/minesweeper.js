const { SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction } = require("discord.js")
const {Minesweeper}= require("discord-gamecord")

module.exports = {
    data : new SlashCommandBuilder()
    .setName("지뢰찾기")
    .setDescription("지뢰찾기 게임을 하빈다."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const { Minesweeper } = require('discord-gamecord');

      const Game = new Minesweeper({
        message: interaction,
        isSlashGame: false,
        embed: {
          title: '지뢰찾기',
          color: '#5865F2',
          description: '지뢰 빼고 다 땅 없애면 됨'
        },
        emojis: { flag: '🚩', mine: '💣' },
        mines: 5,
        timeoutTime: 60000,
        winMessage: '모든 지뢰를 찾아내서 승리했어요!',
        loseMessage: '다음 시간에 봐요..',
        playerOnlyMessage: '오직 {player}님만 사용 가능해요.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
      });
    }
}