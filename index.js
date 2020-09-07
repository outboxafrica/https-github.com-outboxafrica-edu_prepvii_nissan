//express package
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://alemin:' + process.env.MONGO_ATLAS_PWD + '@cluster0.iwsvs.mongodb.net/StoryTeller?retryWrites=true&w=majority')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/userRoute', userRoute);
app.use('/listquestions', questionRoute)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);

});