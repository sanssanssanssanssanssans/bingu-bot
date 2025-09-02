const { SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction } = require("discord.js")
const {Snake}= require("discord-gamecord")

module.exports = {
    data : new SlashCommandBuilder()
    .setName("뱀")
    .setDescription("스네이크 게임을 하빈다."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const Game = new Snake({
            message: interaction,
            isSlashGame: false,
            embed: {
              title: '스네이크 게임',
              overTitle: '게임 끝',
              color: '#5865F2'
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', skull: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: '오직 {player}님만 버튼 사용 가능합니다!'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            console.log(result);  // =>  { result... }
          });
    }
}