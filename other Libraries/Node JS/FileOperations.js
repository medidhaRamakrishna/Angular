//write to file
console.log("Write file start");
var fs=require("fs");
var path="a.txt";
fs.writeFile(path,"This is content added from NODE JS",function(error){
	if(error){
		console.log("error caught"+error.message);
	}else{
		console.log("Successfull wrote"+path)
	}
});
console.log("Write file end");

//Read file
console.log("read file start");
var fs=require("fs");
var path="a.txt";
fs.readFile(path,"utf8",function(error,data){
if(error){
console.log("Doesn't exists");
}else{

console.log(path+"exists"+data.toString());
}
});
console.log("Read file end");
//rename file
console.log("Rename file start");
fs.rename(path,"Renamed.txt",function(error){
	if(error){
		console.log(error);
		
	}else{
		console.log("Successfully renamed")
	}
});

//creating directory

fs.mkdir("MYDIR",function(error){
	if(error){console.log(error.message);
	}else{
		console.log("DIR creaated");
	}
	
});

//list all the files in the directory

fs.readdir("G:\\",function(error,file){
	console.log(file);
});

//delete directory

fs.rmdir("MYDIR",function(error){
	if(error)
	console.log(error.message);
else
	console.log("Deleted Dir");
});