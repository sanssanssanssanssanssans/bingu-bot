const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('로블유저')
    .setDescription('로블 유저의 정보를 알려줍니다.')
    .addStringOption(option => 
      option.setName('유저이름')
        .setDescription('유저 이름을 적으세요')
        .setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.options.getString('유저이름');

    try {
      const userId = await noblox.getIdFromUsername(username);

      const userInfo = await noblox.getPlayerInfo(userId);

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`👤 프로필 : ${userInfo.username}`)
        .setURL(`https://www.roblox.com/users/${userId}/profile`)
        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
        .addFields(
          { name: '✨ 유저 닉네임', value: userInfo.username, inline: true },
          { name: '📛 디스플레이 닉네임', value: userInfo.displayName, inline: true },
          { name: '🆔 유저 아이디', value: userId.toString(), inline: true },
          { name: '📝 설명', value: userInfo.blurb || '설명 없음', inline: false },
          { name: '💬 상태', value: userInfo.status || '아무 상태 아님', inline: false },
          { name: '👥 친구 수', value: userInfo.friendCount.toString(), inline: true },
          { name: '👀 팔로워 수', value: userInfo.followerCount.toString(), inline: true },
          { name: '🔄 팔로잉 수', value: userInfo.followingCount.toString(), inline: true },
          { name: '📅 계정 나이', value: `${userInfo.age}일`, inline: true },
          { name: '📆 가입한 날', value: new Date(userInfo.joinDate).toLocaleDateString(), inline: true }
        )
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('🔗 프로필 보러 가기')
          .setURL(`https://www.roblox.com/users/${userId}/profile`)
          .setStyle(ButtonStyle.Link)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      await interaction.reply(`에러남 : ${error.message}`);
    }
  },
};