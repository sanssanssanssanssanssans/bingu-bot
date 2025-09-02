const {SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("타임아웃")
    .setDescription("플레이어 아가리를 닥치게 합니다")
    .addUserOption(option => 
        option.setName('유저')
        .setDescription("타임아웃 할 사람 고르세요")
        .setRequired(true)
    )
    .addIntegerOption(option => 
        option.setName('초')
        .setDescription("몇시간 탐아할지 정하세요 (초 단위 입니다)")
        .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getUser("유저");
        const duration = interaction.options.getInteger('초');

        if (target.id === interaction.user.id) {
            return interaction.reply({content:"바본가.. 자기 자신을 탐아하네"});
        }

        const member = await interaction.guild.members.fetch(target.id);
        
        if (!member) {
            return interaction.reply({ content: '해당 사용자를 찾을 수 없습니다.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '이 명령어는 관리자만 사용할 수 있습니다.',
                ephemeral: true
            });
        }
        await member.timeout(duration, '타임아웃 명령어에 의한 제한');

        const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('타임아웃 적용 완료')
        .setDescription(`${target.tag}에게 타임아웃을 ${interaction.options.getInteger('초')}초 동안 적용했습니다.`)
        .addFields(
            { name: '타임아웃 대상', value: target.tag, inline: true },
            { name: '타임아웃 시간', value: `${interaction.options.getInteger('초')}초`, inline: true }
        )
        .setTimestamp();

        await interaction.reply({embeds:[embed]});

    }
}