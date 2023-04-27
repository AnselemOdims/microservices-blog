const express = require('express');

const router = express.Router();

router.route('/posts').get().post()

module.exports = router;