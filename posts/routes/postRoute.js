const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postController');

const router = express.Router();

router.route('/posts').get(getAllPosts).post(createPost);

module.exports = router;
