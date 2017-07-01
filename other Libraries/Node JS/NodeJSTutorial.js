//NodeJS

console.log("Welcome to Node JS");

//2)server creation

var http=require('http');
var server=http.createServer(function(req,resp){
	resp.writeHead(200,{"Content-Type":"text/plain"});
	resp.end("Welcome to NodeJS");
});
server.listen(1234,function(){
	console.log("Startd");
});
//3)to install
npm ls (to find list of installed modules)
npm ls -g (to find list of installed modules globally)
npm view modulname(angular)
npm install moduleName(angular,exptress etc)
//4)to get all outdated modules
npm outdated
//5)toupdate all outdated modules
npm update --save 
//6)synchronous and asynchronous
var fs=require("fs");
console.log("program starrted");
var data=fs.readFileSync('a.txt');
console.log(data.toString());
console.log("Program Ended");





















