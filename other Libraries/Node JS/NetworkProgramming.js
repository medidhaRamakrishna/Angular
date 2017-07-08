var fs=require("fs");
var net=require("net");
var filename="Renamed.txt";
var conn=net.createServer(function(connection){
console.log("Connected");
connection.write(JSON.stringify({
	type:"watching",
file:filename})+"\n");
var watcher=fs.watch(filename,function(){
	connection.write(JSON.stringify({
		type:"changed",
		file:filename
		}) +"\n");
});
connection.on("close",function(){
	console.log("Disconnected");
	watcher.close();
});


});

conn.listen(1111,function(){
	console.log("Listening for subscribers");
});




























