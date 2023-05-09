const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const posts = []

app.get('/api/v1/posts', (req, res) => {
    res.status(200).json({ message: 'All posts returned', posts})
})

app.post('/api/v1/events', (req, res) => {
    const { type, data } = req.body;
    try {

        if(type === 'PostCreated') {
            const { id, title } = data;
            posts.push({ id, title, comments: []})
        }
        if(type === 'CommentCreated') {
            const { commentId, comment, postId } = data;
            posts.forEach(item => {
                if(item.id === postId) {
                    item.comments.push({ commentId, comment })
                }
            })
        }
        console.log(posts)
        res.status(200).json({ message: 'Event received', posts })
    } catch(err) {
        console.log(err)
    }
})

app.listen('4002', () => {
    console.log('Server listening on port 4002')
})