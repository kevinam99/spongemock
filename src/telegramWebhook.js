require('dotenv').config()
const axios = require('axios');
const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN
const methods = {
    "set": "/setWebhook",
    "delete": "/deleteWebhook"
}



const telegram_endpoint = `https://api.telegram.org/bot` + TELEGRAM_ACCESS_TOKEN + methods.set
console.log(telegram_endpoint)

options = {
    "url": "https://8a21c9c0f126.ngrok.io/telegramEndpoint",
    "max_connections": 40
}

axios.post(telegram_endpoint, options)
     .then(res => console.log(res.data.description))
     .catch(err => console.error(err))