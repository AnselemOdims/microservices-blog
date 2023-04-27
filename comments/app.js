const express = require('express'); //

const app = express();

app.use(express.json())

app.listen(4001, () => {
    console.log('Comments server listening on port 4001');
})