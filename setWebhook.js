// Run this program and then run the bash script.

require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const endpoint = `/messengerEndpoint`


app.get('/', (req, res) => {
    res.sendStatus(200).write("Hello to spongebob case generator")
})

// Adds support for GET requests to our webhook
app.get(endpoint, (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = PAGE_ACCESS_TOKEN
        
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
        
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
    });



app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


