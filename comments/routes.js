const express = require('express');
const {
  getComments,
  postComments,
} = require('./controllers/commentsController');
const router = express.Router();

router.route('/posts/:id/comments').get(getComments).post(postComments);

module.exports = router;
