module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} 봇이 실행됨.`);
        const commands = client.commands.map(cmd => cmd.data.toJSON());
        try {
            await client.application.commands.set(commands);
            console.log('슬래시 명령어가 모든 서버에 등록됨.');
        } catch (error) {
            console.error('명령어 등록 중 오류 발생:', error);
        }
    },
};
