const express = require('express');
const router = require('./routes');
const cors = require('cors')
const axios = require('axios');

const comments = require('./model/Comment');

const app = express();

app.use(cors())
app.use(express.json())


app.use('/api/v1', router)

app.post('/api/v1/events', (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body;

    if(type === 'CommentModerated') {
        const { postId, status, commentId } = data;
        let commentsToModerate = comments[postId];
        commentsToModerate = commentsToModerate.map(item => {
            if(item.commentId === commentId) {
                item.status = status
            }
        })

        try {

            axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentUpdated',
                data:{
                    ...data,
                    comments: commentsToModerate
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Comments server listening on port 4001');
})