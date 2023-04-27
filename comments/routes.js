const express = require('express');

const router = express.Router();

router.route('/posts/:id/comments').get().post();

module.exports = router;