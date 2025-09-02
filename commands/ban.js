const {SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("벤")
    .setDescription("악질 유저를 밴합니다.")
    .addUserOption(option => 
        option.setName('유저')
        .setDescription("벤 할 사람 고르세요")
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const target = interaction.options.getUser("유저");

        if (target.id === interaction.user.id) {
            return interaction.reply({content:"바본가.. 자기 자신을 벤하려 하네.."});
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
        
        await member.ban({
            deleteMessageSeconds : 600000,
            reason : "벤 당하셨습니다!"
        });

        const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('벤 완료')
        .setDescription(`${target.tag}을 벤했어요.`)
        .addFields(
            { name: '벤 대상', value: target.tag, inline: true }
        )
        .setTimestamp();

        await interaction.reply({embeds:[embed]});

    }
}