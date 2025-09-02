const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const WORD_LIST_FILE = path.join(__dirname, '../data/word.json');
const wordDict = JSON.parse(fs.readFileSync(WORD_LIST_FILE, 'utf-8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('끝말잇기')
        .setDescription('끝말잇기 관련 명령어')
        .addSubcommand(subcommand =>
            subcommand.setName('단어-검색')
                .setDescription('끝말잇기 단어 검색을 합니다.')
                .addStringOption(option =>
                    option.setName('검색어')
                        .setDescription('검색할 단어를 입력하세요.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('긴단어-검색')
                .setDescription('끝말잇기 긴 단어를 검색합니다.')
                .addStringOption(option =>
                    option.setName('시작단어')
                        .setDescription('긴 단어의 시작 글자를 입력하세요.')
                        .setRequired(true)
                )
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} inter
     */
    async execute(inter) {
        const subcommand = inter.options.getSubcommand();
        
        async function searchWord(interaction, searchTerm) {
            let results = [];
            for (let words of Object.values(wordDict)) {
                results.push(...words.filter(word => word.includes(searchTerm)));
            }
            let embed = new EmbedBuilder()
                .setTitle('검색 결과')
                .setColor(0x2ecc71);
            if (results.length > 0) {
                embed.setDescription(`"${searchTerm}"을 포함하는 단어 목록:
            ${results.join(',\n')}`);
            } else {
                embed.setDescription(`"${searchTerm}"을 포함하는 단어가 없습니다.`);
            }
            await interaction.reply({ embeds: [embed] });
        }

        async function searchLongWords(interaction, startLetter) {
            let results = (wordDict[startLetter] || []).filter(word => word.length > startLetter.length);
            results.sort((a, b) => b.length - a.length);
            let top10 = results.slice(0, 10);
            let embed = new EmbedBuilder()
                .setTitle('긴 단어 검색 결과')
                .setColor(0x2ecc71);
            if (top10.length > 0) {
                embed.setDescription(`"${startLetter}"로 시작하는 긴 단어 TOP 10:
            ${top10.join(',\n')}`);
            } else {
                embed.setDescription(`"${startLetter}"로 시작하는 긴 단어가 없습니다.`);
            }
            await interaction.reply({ embeds: [embed] });
        }
        if (subcommand === '단어-검색') {
            const searchTerm = inter.options.getString('검색어').trim();
            return await searchWord(inter, searchTerm);
        } else if (subcommand === '긴단어-검색') {
            const startLetter = inter.options.getString('시작단어').trim();
            return await searchLongWords(inter, startLetter);
        }
    }
};
