const cat = require("../util/cat");
const {SlashCommandBuilder,EmbedBuilder, ChatInputCommandInteraction} = require("discord.js");

module.exports = {
    data : new SlashCommandBuilder()
    .setName("고양이")
    .setDescription("랜덤으로 고양이 사진을 가져옵니다!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setImage(await cat())
        .setColor("Blue")
        .setTitle("ㄱㅇㅇ");
        await interaction.reply({embeds:[embed]});
    }
}