var fs=require("fs");
console.log("Program Started");
var file="a.txt";
fs.exists(file,fileExists);

function fileExists(exists){
	console.log('exists'+exists);
	if(exists)
		fs.stat(file,status);
}
function status(err,stat){
	if(err)  throw err;
	if(stat.isFile()){
		fs.readFile(file,"utf8",readFile);
	}
}
function readFile(err,data){
	if(err)  throw err;
	console.log(data);
}