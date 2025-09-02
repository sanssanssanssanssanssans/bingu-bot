const fs = require('fs');
const path = require('path');

const saveData = (data) => {
    const filePath = path.join(__dirname, '..', 'data', 'money.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = saveData;