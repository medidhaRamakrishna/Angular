var net=require("net");
var lib=require("./lib.js");
var netClient=net.connect({port:1111});
var libClient=lib.connect(netClient);
libClient.on("message",function(message){
	
	if(message.type==='watching'){
		console.log("Now watching"+message.file);
	}else if(message.type==="changed"){
		console.log("File"+message.file+"changed");
	} else{
		throw Error("Unreconixed message type"+message.type);
	}
});