var express=require('express');
var path=require('path');
var body_parser=require('body-parser');
var port=3001;
var API=require('./routes/api');


var app=express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.use('/api',API);
//to supress error Access-Control-Allow-Origin 
app.use(function(req,resp,next){
    resp.header('Access-Control-Allow-Origin','*');
    resp.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
resp.header('Access-Control-Allow-Headers','Content-Type');
next();
});

app.listen(port,function(){
    console.log('Server started at'+port);
});