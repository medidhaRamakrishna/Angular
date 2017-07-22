var f=require('fs');
function callbackfun(err,data){
if(err){
console.log("Errors"+err);
}else{
    console.log("data"+data);
}
}

f.readFile('REPL',callbackfun);