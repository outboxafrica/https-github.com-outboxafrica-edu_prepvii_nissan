//express package
const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send("Hello JSON!")
})

app.listen(3000, () => {
    console.log(`Server listening on port http://localhost:${3000}`);
})