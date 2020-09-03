//declaring node packages
const express = require('express');

//routing pages
const router = express.Router();

const Quest = require('../models/questionModel');


// const app = express();

//app.METHOD(PATH,HANDLER);
/*
 *router.get('/', (req, res) => {
 *    res.send('Home page')
 *})
 */

router.get('/questions', (req, res) => {
    res.send('Questions page')
})

router.delete('/', (req, res) => {
    const myData = new Quest();
    myData.deleteOne();
    res.send('Posting question to database')
})


//Saving input information and then routing to next page
async function as(req, res) {

    const myData = new Quest(req.body); //body = question. Depends on the name used to pass data from the form.
    try {
        await myData.save();
        console.log("item has been saved to database")

        res.redirect("/forum") //redirects user to view Qs & As on the 'forum'(views)


    } catch (err) {
        console.error(`There is an error - ${err}`);
    }
}

router.post("/", as);

// module.exports = router;