var fs=require("fs");
var domain=require("domain").create();

domain.run(function(){
console.log("program starrted");
var data=fs.readFile('a1.txt',function(){
console.log(data.toString());
console.log("Program Ended");	
});

});
domain.on("error",function(err){
	console.log("caught error");
});
//process.on("uncaughtException",function)//exception handling 