//NodeJS

console.log("Welcome to Node JS");

//2)server creation
/*
1)Import required modules: The "require" directive is used to load a Node.js module.
2)Create server: You have to establish a server which will listen to client's request similar to Apache HTTP Server.
3)Read request and return response: Server created in the second step will read HTTP request made by client which can be a browser or console and return the response. */

var http=require('http');
var server=http.createServer(function(req,resp){
	resp.writeHead(200,{"Content-Type":"text/plain"});
	resp.end("Welcome to NodeJS");
});
server.listen(1234,function(){
	console.log("Startd");
	var name='John';
console.warn(`don't mess with me ${name}`);
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

//You can also use underscore _ to get the last result.

_*10

/*Node.js REPL

The term REPL stands for Read Eval Print and Loop. It specifies a computer environment like a window console or a Unix/Linux 
shell where you can enter the commands and the system responds with an output in an interactive mode. */

/*Node.js Package Manager

Node Package Manager provides two main functionalities:

It provides online repositories for node.js packages/modules which are searchable on search.nodejs.org
It also provides command line utility to install Node.js packages, do version management and dependency management of Node.js packages.
*/	
//NPM 
1)npm uninstall express   to uninstall
2)npm install express -g  to install globally
3)npm ls                    to listout all npm modules intalled















1