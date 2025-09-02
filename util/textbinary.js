module.exports = function (text) {
    let binaryString = '';
    for (let i = 0; i < text.length; i++) {
        binaryString += text.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
    }
    return binaryString.trim();
}