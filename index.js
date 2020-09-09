const cors=require('cors');
const exp=require('express');
const bodyParser=require('body-parser');
const passport=require('passport')
const {connect}=require('mongoose');
const {success, error}=require('consola');
const morgan=require('morgan');
//const userRoute=require('./routes/userRoute')
const questionRoutes=require('./routes/questionRoutes');
//const key=require('./middleware/keys');

const app = express();

const {DB, PORT} =require('./config');
const app=exp()

mongoose.connect('mongodb+srv://alemin:lubang@cluster0.iwsvs.mongodb.net/StoryTeller?retryWrites=true&w=majority')
// mongoose.connect(key.mongodb.dbURI, { useUnifiedTopology: true }, ()=>{
//     console.log("Connected to mongoDB");
// });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

require('./middleware/passport')(passport);
app.use('/questionRoutes', questionRoutes);
app.use('/auth/users', require('./routes/users'));
const startApp= async()=>{
    
//connect.Promise=global.Promise;
await connect(DB, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> success({
    message: `Successfully connected to the database \n${DB}`, 
    badge:true
})
).catch(err=> error({
    message: `Failed to connected to the database \n${err}`, 
    badge:true
}));

app.use((req, res, next)=>{
    const error= new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error
        }
    });
});


const PORT=process.env.PORT || 4000;

}
startApp();