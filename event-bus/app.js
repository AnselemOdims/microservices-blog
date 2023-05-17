const express = require('express');
const axios = require('axios');

const app = express(); 

app.use(express.json());

const events = []

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);

    const event = req.body;
    events.push(event);
    console.log('All events saved')
    try {
        await axios.post('http://posts-clusterip-srv:4000/api/v1/events', req.body).catch(err => { console.log(err)})
        // await axios.post('http://localhost:4001/api/v1/events', req.body).catch(err => { console.log(err)})
        // await axios.post('http://localhost:4002/api/v1/events', req.body).catch(err => { console.log(err)})
        // await axios.post('http://localhost:4003/api/v1/events', req.body).catch(err => { console.log(err)})

        res.status(200).json({ message: "Event sent to all services"});
    } catch(err) {
        console.log(err)
    }
})

app.get('/events', (req, res) => {
    res.status(200).json({ message: 'All events returned', events })
})

app.listen('4005', () => {
    console.log('Server listening on port 4005')
})
