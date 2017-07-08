var express=require("express");
var app=express();

var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(express.static('public'));
app.get('/index.html',function(req,res){
	console.log(__dirname+"/"+"index.html");
	res.sendFile(__dirname+"/"+"index.html");
});
app.post('/process_post',urlencodedParser,function(req,resp){
	console.log("Got a GET request for About us");
	respose={
		first_name:req.body.first_name,
		last_name:req.body.last_name
	};
	console.log(respose);
	resp.send(JSON.stringify(respose));
});

app.get('/index.html/:param',function(req,resp){
	console.log("Got a GET request for list");
	console.log("req.params.param"+req.params.param);
	resp.send("Page Listing"+req.params.param);
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("Example app http://%s:%s",host,port);
});