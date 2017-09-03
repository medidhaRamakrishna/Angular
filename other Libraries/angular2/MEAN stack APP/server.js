var express=require('express');
var path=require('path');
var parser=require('body-parser');
var port=8888;



index=require('./routes/index');
task=require('./routes/task');

var app=express();
//view Engine

/*app.set('views',path.join(__dirname,'client/src'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
*/

//setting static folder
app.use(express.static(path.join(__dirname,'client')));
//Body parser Folder
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
//to supress error Access-Control-Allow-Origin 
app.use(function(req,resp,next){
    resp.header('Access-Control-Allow-Origin','*');
    resp.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
resp.header('Access-Control-Allow-Headers','Content-Type');
next();
})
app.use('/',index);
app.use('/api',task);
app.listen(port,function(){
console.log('server started on'+port);
});
