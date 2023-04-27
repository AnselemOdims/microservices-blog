const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json())


app.use('/', router)

app.listen(4001, () => {
    console.log('Comments server listening on port 4001');
})