require('dotenv').config()
const app = require('express')()

// express middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// custom methods
const mockText = require('./spongebob')
const { respondMessenger, respondTelegram } = require('./sendMessage')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).redirect(`https://m.me/spongemock`)
})

app.get('/messengerEndpoint', (req, res) => { // set webhook
        // Your verify token. Should be a random string.
        const VERIFY_TOKEN = PAGE_ACCESS_TOKEN
          
        // Parse the query params
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
          
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
        
          // Checks the mode and token sent is correct
          if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
          
          } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
          }
        }
})



app.post(`/messengerEndpoint`, (req, res) => {  
 
    let body = req.body;
    // Checks this is an event from a page
    if (body.object === 'page') {
        
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let text = entry.messaging[0].message.text
        let replyToId = entry.messaging[0].sender.id
        respondMessenger(mockText(text), replyToId)
      })
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

// Telegram webhook endpoint
app.post('/telegramEndpoint', (req, res) => {
  if(req.body) {
    res.status(200).send('Message received')
    const PAYLOAD = req.body
    console.log("PAYLOAD:")
    console.log(PAYLOAD)
    console.log('EVENT RECEIVED')
    const chatId = PAYLOAD.message.chat.id
    const message = mockText(PAYLOAD.message.text)
    if(message === `/start` || message === `/help`) respondTelegram(chatId, `Text me and I'll send it in SPonGEbOB CAsE`)
    else {
      console.log("RESPONSE:")
      respondTelegram(chatId, message)
    }
  }
  else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
 
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))