const express = require('express');
const router = require('./routes');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())


app.use('/api/v1', router)

app.post('/api/v1/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.status(200).json({ msg: 'Comment Event received'})
})

app.listen(4001, () => {
    console.log('Comments server listening on port 4001');
})