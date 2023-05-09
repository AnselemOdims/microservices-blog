const express = require('express');
const axios = require('axios');

const app = express(); 

app.use(express.json());

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    try {
        await axios.post('http://localhost:4000/api/v1/events', req.body)
        await axios.post('http://localhost:4001/api/v1/events', req.body)
        await axios.post('http://localhost:4002/api/v1/events', req.body)

        res.status(200).json({ message: "Event sent to all services"});
    } catch(err) {
        console.log(err)
    }
})

app.listen('4005', () => {
    console.log('Server listening on port 4005')
})
