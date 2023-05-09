const express = require('express');
const cors = require('cors')
const router = require('./routes/postRoute');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);

app.post('/api/v1/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.status(200).json({ msg: 'Post Event received'})
})

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})
