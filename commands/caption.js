const { SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js');  // MessageAttachment -> AttachmentBuilder로 변경
const Canvas = require('canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('캡션')
		.setDescription('이미지에 텍스트를 추가합니다.')
        .addStringOption(option =>
            option.setName('텍스트')
                .setDescription('상단 텍스트')
                .setRequired(true))
        .addAttachmentOption(option => 
            option.setName('이미지')
                .setDescription('이미지 파일')
                .setRequired(true)),

	async execute(interaction) {
		if (!interaction.isCommand()) return;
		if (!interaction.guild.available) {
			return await interaction.reply('이 서버에서 작업을 수행할 수 없습니다.');
		}

		await interaction.deferReply();

		const topText = interaction.options.getString('텍스트');
		const imageAttachment = interaction.options.getAttachment('이미지');

		try {
			const bg = await Canvas.loadImage(imageAttachment.url);
			const width = bg.width;
			const height = bg.height;

			const canvas = Canvas.createCanvas(width, height);
			const ctx = canvas.getContext("2d");

			const TextBounds = (canvas, text) => {
				const context = canvas.getContext('2d');
				let fontSize = 150; 
				do {
					context.font = `${fontSize}px Impact`;
					fontSize -= 5;
				} while (context.measureText(text).width > canvas.width - 100);
				return context.font;
			};
			
			ctx.font = TextBounds(canvas, topText);
			ctx.fillStyle = '#FFFFFF';
			ctx.strokeStyle = 'black';
			ctx.textAlign = "center";
			ctx.drawImage(bg, 0, 0, width, height);
			ctx.fillText(topText, width / 2, height / 1.2, width);
            ctx.strokeText(topText, width / 2, height / 1.2, width);


			const captionedImage = new AttachmentBuilder(canvas.toBuffer(), { name: 'captionpic.png' });  
			return await interaction.editReply({ files: [captionedImage] });

		} catch (error) {
			if (interaction.replied) {
				return interaction.editReply({ content: '오류가 발생했습니다. 다시 시도해 주세요.' });
			} else {
				await interaction.reply({ content: '오류가 발생했습니다. 다시 시도해 주세요.', ephemeral: true });
			}
		}
	}
};
