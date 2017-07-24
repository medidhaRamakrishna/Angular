const express=require('express');
const router=require('./api')
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
//mongo db connecion
mongoose.connect('mongodb://localhost/mycontacts');//ninjago heck for this name in mongo if not exist it will create
mongoose.Promise=global.Promise;

//using body parser in JSON format
app.use(bodyParser.json());

//using middle ware router
app.use('/api',router);


//error handling middleware
app.use(function(err,req,resp,errMiddleWare){
resp.status(401).send({Error:err.message});
});

app.listen(4000,function(){
console.log('started listening');

});