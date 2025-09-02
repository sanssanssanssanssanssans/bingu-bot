
const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('마크스킨')
    .setDescription('유저 이름으로 마크스킨을 알려줍니다.')
    .addStringOption(option =>
      option.setName('이름')
        .setDescription('마인크래프트 유저 이름을 적으세요')
        .setRequired(true)),

  async execute(interaction) {
    const username = interaction.options.getString('이름');

    const embed = new EmbedBuilder()
      .setTitle('스킨')
      .setImage(`https://minotar.net/body/${username}/100.png`)
      .setColor('2F3136')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};