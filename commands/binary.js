const { ChatInputCommandInteraction, SlashCommandBuilder,EmbedBuilder } = require("discord.js");
const textToBinary = require("../util/textbinary");
const binaryToText = require("../util/binarytext")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('이진법')
        .setDescription('특정 문자나 숫자를 이진법으로 변환 하거나 해독합니다.')
        .addStringOption(option => 
            option.setName('텍스트')
            .setDescription('변환 또는 해독할 텍스트를 입력하세요.')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('모드')
            .setDescription('변환 또는 해독 모드를 선택하세요.')
            .addChoices(
                { name: '변환', value: '변환하기' },
                { name: '해독', value: '해독' }
            ).setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const text = interaction.options.getString('텍스트');
        const mode = interaction.options.getString('모드');
        
        if (mode === '변환하기') {
            const result = textToBinary(text);
            const embed = new EmbedBuilder()
            .setTitle("이진수 변환 결과 : \n")
            .setDescription(`${result}`)
            .setColor("Blue")
            .setTimestamp();
            await interaction.reply({embeds:[embed]});
        } else if (mode === '해독') {
            const result = binaryToText(text);
            const embed = new EmbedBuilder()
            .setTitle("이진수 변환 결과 : \n")
            .setDescription(`${result}`)
            .setColor("Blue")
            .setTimestamp();
            await interaction.reply({embeds:[embed]});
        }
    }
};