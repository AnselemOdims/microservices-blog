const express = require('express');


const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type === 'CommentCreated') {
        const { comment } = data;
        const moderatedStatus = comment.includes('shit') ? 'rejected' : 'approved'
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
    console.log('Server listening on port 4003')
})