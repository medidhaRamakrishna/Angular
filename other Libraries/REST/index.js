const express=require('express');
const routes=require('./api');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
//set up express app
const app=express();
//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');//ninjago heck for this name in mongo if not exist it will create
mongoose.Promise=global.Promise;
//use body parser
app.use(bodyParser.json());//app.use()=> is used in node for Mounting a middleware at a path,
//initialize routes
app.use('/api',routes);//here routers is middleware we are going to mount  at  /api path
//error handlig middleware
app.use(function(err,req,resp,errHandler){
    //console.log(err);
    resp.status(401).send({Error:err.message});
});
//listen for request
app.listen(process.env.port ||4000,function(){
console.log('Now listening for request');
});

