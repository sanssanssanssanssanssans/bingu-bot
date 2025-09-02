const {SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder,PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("청소")
    .setDescription("메세지를 청소합니다.")
    .addIntegerOption(option => 
        option.setName('수')
        .setDescription("삭제할 메세지 개수를 구하세요")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '이 명령어는 관리자만 사용할 수 있습니다.',
                ephemeral: true
            });
        }

        const count = interaction.options.getInteger('수');
        try {
            await interaction.channel.bulkDelete(count,true);
            const embed = new EmbedBuilder()
                .setColor('#FF4500')
                .setTitle('메시지 삭제 완료')
                .setDescription(`최근 ${count}개의 메시지를 삭제했습니다.`)
                .setTimestamp();
            return interaction.reply({embeds:[embed]});
        } catch {
            const embed = new EmbedBuilder()
                .setColor('#FF4500')
                .setTitle('메시지 삭제 실패')
                .setDescription(`오류가 났어요!`)
                .setTimestamp();
            return interaction.reply({embeds:[embed]});
        }

    }
}