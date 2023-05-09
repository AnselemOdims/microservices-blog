const express = require('express');
const axios = require('axios')


const app = express();

app.use(express.json());

app.post('/api/v1/events', async (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body;

    if(type === 'CommentCreated') {
        const { comment } = data;
        const moderatedStatus = comment.includes('shit') ? 'rejected' : 'approved'
        console.log(moderatedStatus)
        try {
            axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: {
                    ...data,
                    status: moderatedStatus
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    res.send({})
 })

app.listen('4003', () => {
    console.log('Moderation Server listening on port 4003')
})