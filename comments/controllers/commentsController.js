const comments = require('../model/Comment');
const { randomBytes } = require('crypto');

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = comments[id]
        res.status(200).json({ msg: 'Comments retrieved successfully', comment})
    }catch(err) {
        res.status(500).json({msg: err.message})
    }
}

const postComments = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const commentId = randomBytes(4).toString('hex');
        const newComment = { commentId, comment}
        const postComment = comments[id] || []
        postComment.push(newComment)
        comments[id] = postComment
        res.status(201).json({ msg: 'Comment posted successfully', comments})
    }catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getComments,
    postComments
}