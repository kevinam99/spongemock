require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const mockText = require('./spongebob')
const respond = require('./sendMessage')

const PORT = process.env.PORT || 3000


app.post(`/messengerEndpoint`, (req, res) => {  
 
    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let text = entry.messaging[0].message.text
        let replyToId = entry.messaging[0].sender.id
        respond(mockText(text), replyToId)
      })
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))