require('dotenv').config()
const axios = require('axios')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const TELEGRAM_ACCESS_TOKEN = process.env.TELEGRAM_ACCESS_TOKEN

const sendFacebookMessage = (msgBody, recipientID) => {
    const hostname = `https://graph.facebook.com/v9.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`
    const data = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": recipientID.toString()
        },
        "message": {
            "text": msgBody
        },
    }
    axios.post(hostname,data, {
        headers: {
            "Content-Type": "application/json"
    }})
         .then(res => console.log(res.data))
         .catch(err => console.error(err.message))

}

const sendTelegramMessage = (chat_id, message, reply_to_message_id = 0, parse_mode = "markdown") => {

    options = {
        "chat_id": chat_id, // can also use username, eg: @kxvn5
        "text": message,
        "parse_mode": parse_mode,
        "disable_web_page_preview": true,
        "disable_notification": false,
        "reply_to_message_id": reply_to_message_id // 0 for plain text message
    }
    
    const telegram_endpoint = `https://api.telegram.org/bot` + TELEGRAM_ACCESS_TOKEN
    
    axios.post(telegram_endpoint + "/sendMessage", options)
         .then(res => console.log(res.data))
         .catch(err => console.error(err.response.data))
    }

module.exports = {
    respondMessenger: sendFacebookMessage,
    respondTelegram: sendTelegramMessage
}