const { SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction, Embed } = require("discord.js");
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    data : new SlashCommandBuilder()
    .setName("아바타")
    .setDescription("유저의 아바타를 가지고 옵니다. (그 아바타 아님)")
    .addUserOption(option => 
        option.setName("유저")
        .setDescription("유저를 고르세요!")
        .setRequired(true)
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
       const embed = new EmbedBuilder()
       .setImage(interaction.options.getUser("유저").avatarURL())
       .setColor("Blurple")
       .setTimestamp();

       await interaction.reply({embeds:[embed]});
    }
}