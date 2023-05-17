const express = require('express');
const cors = require('cors')
const router = require('./routes/postRoute');
const posts = require('./model/Post')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);

app.post('/api/v1/events', (req, res) => {
    console.log('Received Event', req.body.type)
    const { type, data } = req.body;

    if(type === 'CommentUpdated') {
        const { commentId, comment, postId, status } = data;
        posts.forEach(item => {
            if(item.id === postId) {
                item.comments ? item.comments.forEach(commentItem => {
                    if(commentItem.commentId === commentId) {
                        commentItem.status = status
                        commentItem.comment = comment
                    }
                }) : item.comments = [comment]
            }
        })
    }
    res.status(200).json({ msg: 'Post Event received'})
})

app.listen(4000, () => {
    console.log('Post Server running v1.0.0')
    console.log('Post Server listening on port 4000')
})
