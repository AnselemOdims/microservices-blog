const allComments = require('../model/Comment');
const { randomBytes } = require('crypto');
const axios = require('axios');

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = allComments[id]
        res.status(200).json({ msg: 'Comments retrieved successfully', comments })
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

const postComments = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { comment } = req.body;
        const commentId = randomBytes(4).toString('hex');
        const newComment = { commentId, comment, postId, status: 'pending' }
        const postComment = allComments[postId] || []
        postComment.push(newComment)
        allComments[postId] = postComment

        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            data: newComment
        })

        res.status(201).json({ msg: 'Comment posted successfully', allComments})
    }catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getComments,
    postComments
}