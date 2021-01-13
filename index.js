// const app = require('express')()

const tweak = (c) => {
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
}

const mock = (text) => {
    text = text.split("").map(tweak).join("");
    return text

}

let input = `All SOPs will be followed`
let output = mock(input)

console.log(output)