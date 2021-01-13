require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const sendMessage = (msgBody, recipientID) => {
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

module.exports = sendMessage