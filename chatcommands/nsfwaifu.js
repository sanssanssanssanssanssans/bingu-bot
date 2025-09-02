const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "와이프",
  description: "NSFW에서만 사용 가능합니다 제발",
  async execute(message, args) {
    if (!message.channel.nsfw) {
      await message.reply("🚫 이 명령어는 NSFW 채널에서만 사용할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch("https://api.waifu.pics/nsfw/waifu", {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        await message.reply(`❌ API 요청 실패 (상태 코드: **${response.status}**)`);
        return;
      }

      const waifuData = await response.json();
      const waifuImage = waifuData.url;

      const waifuEmbed = new EmbedBuilder()
        .setColor("#FF69B4") 
        .setTitle("💖 와이프")
        .setImage(waifuImage)
        .setTimestamp();

      await message.reply({ embeds: [waifuEmbed] });

    } catch (error) {
      console.error("❌ API 요청 중 오류 발생:", error);
      await message.reply("⚠️ 와이프 이미지를 불러오는 중 오류가 발생했습니다.");
    }
  }
};
