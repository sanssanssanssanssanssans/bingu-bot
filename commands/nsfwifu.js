const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('야짤')
    .setDescription('야짤 사진을 올려줍니다ㅡㅇㅁㄴ.ㅇㄹ.ㅠㅠㅠㅠㅜㅠㅠㅠㅠㅠㅠㅠㅠㅠ'),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const waifuFetch = await fetch("https://api.waifu.pics/nsfw/waifu", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!waifuFetch.ok) {
      interaction.followUp(
        `API 정보 안됨 **${response.status}**.`
      );
      return;
    }

    const waifuData = await waifuFetch.json();
    const waifuImage = waifuData.url;

    const waifuEmbed = new EmbedBuilder()
      .setImage(waifuImage)
      .setTimestamp();

    await interaction.reply({
      embeds: [waifuEmbed],
    });
  }
};
