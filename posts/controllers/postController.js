const Post = require('../model/Post');
const { randomBytes } = require('crypto')

const getAllPosts = async(req, res) => {
    try {
        res.status(200).json({ msg: 'All posts returned', posts: Post})
    } catch(err) {
        res.status(500).json({ msg: err.message})
    }
}

const createPost = (req, res) => {
    try {
        const { title } = req.body;
        if(!title) return res.status(400).json({ msg: 'Title is required'});
        const id = randomBytes(20).toString('hex');
        const newPost = {id, title}
        Post.push(newPost);
        res.status(201).json({ msg: 'New post created', post: newPost})
    } catch(err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getAllPosts,
    createPost
}