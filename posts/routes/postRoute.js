const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postController');

const router = express.Router();

router.route('/posts/create').post(createPost);
router.route('/posts').get(getAllPosts)

module.exports = router;
