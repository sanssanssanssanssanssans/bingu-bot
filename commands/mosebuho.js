
const {SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Embed } = require('discord.js');
const morse = require("morse")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('모스부호')
    .setDescription('특정 문자를 모스부호로 변환하거나, 또는 치환합니다. (영어만 가능)')
    .addStringOption(option =>
      option.setName('선택')
        .setDescription('고르세요')
        .addChoices({
            name : "변환",
            value : "xd"
        },{
            name : "해독",
            value : "xb"
        })
        .setRequired(true))
    .addStringOption(option =>
            option.setName('텍스트')
              .setDescription('텍스트를 적으세요!')
              .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        // 잘되네
        // -... --- -.-- .- -. ... .. -.-. ....... -- ..- -.- --. --- ....... ... .... .. .--. -.. .- -> boyangsic mukgo shipda <- real kk
        const suntack = interaction.options.getString("선택");
        const text = interaction.options.getString("텍스트");
        if (suntack=="xd") {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(":arrows_clockwise: 변환 결과 : ")
            .addFields({
                name : "원래 텍스트 :",
                value : `${text}`
            },{
                name : "변환 결과 :",
                value : `${morse.encode(text)}`
            });
            await interaction.reply({
                embeds : [embed]
            });
        } else {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(":arrows_clockwise: 해독 결과 : ")
            .addFields({
                name : "원래 텍스트 :",
                value : `${text}`
            },{
                name : "해독 결과 :",
                value : `${morse.decode(text)}`
            });
            await interaction.reply({
                embeds : [embed]
            });
        }
    }
};