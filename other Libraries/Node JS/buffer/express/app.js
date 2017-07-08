var express=require("express");
var app=express();
app.get('/',function(req,res){
	res.send("Hello World");
});
app.get('/aboutus',function(req,resp){
	console.log("Got a GET request for About us");
	resp.send("About us");
});

app.get('/*list',function(req,resp){
	console.log("Got a GET request for list");
	resp.send("Page Listing");
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("Example app http://%s:%s",host,port);
});