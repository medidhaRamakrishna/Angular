var fs=require("fs");
console.log("Program Started");
fs.readFile('a.txt',function(err,data){
if(err)
  return console.log(err);
  
  console.log(data.toString());
});
console.log("Program Ended");