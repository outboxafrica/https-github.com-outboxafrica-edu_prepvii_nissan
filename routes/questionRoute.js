const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// const app = express();

//app.METHOD(PATH,HANDLER);
router.get('/', (req, res) => {
    res.send('Home page')
})

router.get('/questions', (req, res) => {
    res.send('Questions page')
})

router.post('/questions/post', () => {
    res.send('Posting question to database')
})

module.exports = router;