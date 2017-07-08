var fs=require("fs");
var net=require("net");
var filename="Renamed.txt";
var conn=net.createServer(function(connection){
console.log("Connected");
connection.write('{"type":"changed","file":"Re');

var timer=setTimeout(function(){
connection.write('named.txt"}'+"\n");
connection.end();
},3000);
connection.on("end",function(){
	clearTimeout(timer);
	console.log("Disconnected");
	
});


});

conn.listen(1111,function(){
	console.log("Listening for subscribers");
});




























