
const {SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Embed } = require('discord.js');
const par = require("chkparenthesis");
const { tree } = require('morse');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('괄호')
    .setDescription('특정 문자의 괄호가 올바른 괄호인지 확인합니다 :thinking: ')
    .addStringOption(option =>
            option.setName('텍스트')
              .setDescription('텍스트를 적으세요! 적어도 괄호가 한 쌍은 있어야 합니다.')
              .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const text = interaction.options.getString("텍스트");
        if (par(text) === true) {
            const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription("올바른 괄호쌍이에요!")
            .addFields({
                name : "검사한 텍스트",
                value : `${text}`,
                inline : true
            });
            await interaction.reply({
                embeds : [embed]
            });
        } else {
            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("올바르지 않은 괄호쌍이에요.. \n 뭔가 잘못되었는지 확인해봐요!")
            .addFields({
                name : "검사한 텍스트",
                value : `${text}`,
                inline : true
            });
            await interaction.reply({
                embeds : [embed]
            });
        }
    }
};