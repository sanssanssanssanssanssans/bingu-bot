/* eslint-disable */
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const translate = require('@iamtraction/google-translate');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('번역')
    .setDescription('무언가를 번역합니다')
    .addStringOption(option => option.setName('텍스트').setDescription('번역할 텍스트를 써주세요').setRequired(true))
    .addStringOption(option => option.setName('언어').setDescription('무슨 언어로 번역할지 골라주세요').addChoices(
        { name: '영어', value: 'en' },
        { name: '스페인어', value: 'es' },
        { name: '프랑스어', value: 'fr' },
        { name: '독일어', value: 'de' },
        { name: '이탈리아어', value: 'it' },
        { name: '네덜란드어', value: 'nl' },
        { name: '포르투갈어', value: 'pt' },
        { name: '러시아어', value: 'ru' },
        { name: '일본어', value: 'ja' },
        { name: '한국어', value: 'ko' },
        { name: '간체 중국어', value: 'zh-cn' },
        { name: '번체 중국어', value: 'zh-tw' },
        { name: '아랍어', value: 'ar' },
        { name: '터키어', value: 'tr' },
        { name: '힌디어', value: 'hi' },
        { name: '인도네시아어', value: 'id' },
        { name: '베트남어', value: 'vi' },
        { name: '태국어', value: 'th' },
        { name: '히브리어', value: 'iw' },
        { name: '그리스어', value: 'el' },
        { name: '스웨덴어', value: 'sv' },
        { name: '필리핀어', value: 'tl' },
        { name: '말레이어', value: 'ms' },
        { name: '자바어', value: 'jw' },
        { name: '순다어', value: 'su' }
        ).setRequired(true)),
    
    async execute(interaction) {

        const { options } = interaction;
        const text = options.getString('텍스트');
        const lan = options.getString('언어');

        await interaction.reply({content: '번역중........'});

        const applied = await translate(text, { to: `${lan}` });

        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('번역된 언어: ')
        .addFields({ name: '원본 텍스트 : ', value: `\`\`\`${text}\`\`\``, inline: false })
        .addFields({ name: `번역된 텍스트 : (${lan})`, value: `\`\`\`${applied.text}\`\`\``, inline: false })

        await interaction.editReply({content: '', embeds: [embed]});
    }
}