const getCase = (c) => {
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
}

const mockText = (text) => {
    text = text.split("").map(getCase).join("");
    return text

}

let input = `All SOPs will be followed`
let output = mockText(input)

console.log(output)