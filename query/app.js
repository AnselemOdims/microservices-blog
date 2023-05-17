const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(cors());

app.use(express.json());

const posts = []

const handleEvents = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;
        posts.push({ id, title, comments: []})
    }
    if(type === 'CommentCreated') {
        const { commentId, comment, postId, status } = data;
        posts.forEach(item => {
            if(item.id === postId) {
                item.comments.push({ commentId, comment, status })
            }
        })
    }
    if(type === 'CommentUpdated') {
        const { commentId, comment, postId, status } = data;
        posts.forEach(item => {
            if(item.id === postId) {
                item.comments.forEach(commentItem => {
                    if(commentItem.commentId === commentId) {
                        commentItem.status = status
                        commentItem.comment = comment
                    }
                })
            }
        })
    }
}

app.get('/api/v1/posts', (req, res) => {
    res.status(200).json({ message: 'All posts returned', posts})
})

app.post('/api/v1/events', (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body;
    try {
        handleEvents(type, data)
        res.status(200).json({ message: 'Event received', posts })
    } catch(err) {
        console.log(err)
    }
})

app.listen('4002', async () => {
    console.log('Server listening on port 4002')

    const { data } = await axios.get('http://event-bus-srv:4005/events')
    data.events.forEach(event => {
        console.log('Processing event:', event.type)
        handleEvents(event.type, event.data)
    })

})