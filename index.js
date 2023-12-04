const express = require ("express");
const ejs = require('ejs');
const dbConnect = require ("./config/dbConnect");
const  {notFound, errorHandler} = require('./middlewares/errorHandler')
const session = require('express-session')
const path = require('path');
const cors = require("cors")

const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT ||4200
const authRouter = require ('./routes/authRoute');
const userRoute=require('./routes/userRoute');
const storeRouter =require('./routes/storeRoute');




const passport = require('passport');
app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use(passport.session());

app.use(passport.initialize());

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
dbConnect();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static('index.ejs'));
app.set("views", "./views");
app.set("view engine", "ejs");




app.use('/api/user', authRouter);
app.use('/api',userRoute);
app.use('/api/store', storeRouter);



app.use(notFound)
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})