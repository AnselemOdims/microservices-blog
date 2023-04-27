const express = require('express');
const router = require('./routes/postRoute');

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})
