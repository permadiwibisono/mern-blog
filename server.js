'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const postRoute = require('./routes/posts');

var port = process.env.API_PORT || 3001;

mongoose.connect(`mongodb://127.0.0.1:27017/blogs`)

mongoose.Promise = global.Promise;

mongoose.connection.on('error',console.error.bind(console,'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// SET CORS
app.use(function(req,res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

router.get('/',(req,res)=>{
    res.json({message:'API Initialized'});
});

app.use('/api',router)

app.use('/api/posts',postRoute);

app.listen(port,()=>{
    console.log(`API running on port ${port}`);
})
