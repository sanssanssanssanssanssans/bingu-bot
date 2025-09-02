const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/dhanuh.json');

const getData = () => {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
            return {};
        }
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(`❌ JSON 파일을 읽는 중 오류 발생: ${err.message}`);
        return {};
    }
};

const saveData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error(`❌ JSON 파일을 저장하는 중 오류 발생: ${err.message}`);
    }
};

module.exports = { getData, saveData };
