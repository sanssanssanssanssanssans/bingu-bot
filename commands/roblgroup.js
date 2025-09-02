const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('로블그룹')
    .setDescription('로블록스 그룹 정보를 알려줍니다.')
    .addIntegerOption(option => 
      option.setName('그룹아이디')
        .setDescription('그룹 아이디를 적으세욤')
        .setRequired(true)
    ),
  async execute(interaction) {
    const groupId = interaction.options.getInteger('그룹아이디');

    try {
      const groupInfo = await noblox.getGroup(groupId);

      const embed = new EmbedBuilder()
        .setColor('#1E90FF')
        .setTitle(`🏢 그룹 정보 : ${groupInfo.name}`)
        .setURL(`https://www.roblox.com/groups/${groupId}`)
        .setThumbnail(groupInfo.emblemUrl)
        .addFields(
          { name: '📛 이름', value: groupInfo.name, inline: true },
          { name: '🆔 그룹 아이디', value: groupId.toString(), inline: true },
          { name: '📝 그룹 설명', value: groupInfo.description || '설명 없음', inline: false },
          { name: '👥 멤버 수', value: groupInfo.memberCount.toString(), inline: true },
          { name: '🔗 그룹 소유자', value: `[${groupInfo.owner.username}](https://www.roblox.com/users/${groupInfo.owner.userId}/profile)`, inline: true }
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('🔗 그룹 보기')
          .setURL(`https://www.roblox.com/groups/${groupId}`)
          .setStyle(ButtonStyle.Link)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      await interaction.reply(`그룹 찾기에 실패했어요. : ${error.message}`);
    }
  },
};