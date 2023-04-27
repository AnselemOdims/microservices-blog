const express = require('express');
const cors = require('cors')
const router = require('./routes/postRoute');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})
