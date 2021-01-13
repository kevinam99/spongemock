const getCase = (c) => {
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
}

const mockText = (text) => {
    text = text.split("").map(getCase).join("");
    return text

}

module.exports = mockText