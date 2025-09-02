const fs = require('fs');
const path = require('path');

const loadData = () => {
    const filePath = path.join(__dirname, '..', 'data', 'money.json');
    if (!fs.existsSync(filePath)) {
        return {}; 
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

module.exports = loadData;
