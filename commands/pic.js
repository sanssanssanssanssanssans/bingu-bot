
const {SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Embed } = require('discord.js');
const par = require("chkparenthesis");
const { tree } = require('morse');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('골라')
    .setDescription('선택지가 없을때 빙구봇이 골라줍니다')
    .addStringOption(option =>
            option.setName('텍스트1')
              .setDescription('ㅎㅎ')
              .setRequired(true))
              .addStringOption(option =>
                option.setName('텍스트2')
                  .setDescription('ㅎㅎ')
                  .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const text1 = interaction.options.getString("텍스트1");
        const text2 = interaction.options.getString("텍스트2");
        const 보양식따먹고싶다인정어인정 = [text1,text2];
        const 빙구도따먹자인정어인정 = Math.floor(Math.random() * 보양식따먹고싶다인정어인정.length);

        const embed = new EmbedBuilder()
        .setColor("Green")
        .addFields({
            name : "빙구봇이 고른 선택 :",
            value : `${보양식따먹고싶다인정어인정[빙구도따먹자인정어인정]}`,
            inline : true
        });
        await interaction.reply({
            embeds : [embed]
        });
    }
};