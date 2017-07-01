var net=require("net");
var client=net.connect({por:1111});
client.on("data",function(data){
	var message=JSON.parse(data);
	if(message.type=='watching'){
		console.log("Now watching"+message.file);
	}else if(message.type="changed"){
		console.log("File"+message.file+"changed");
	}/* else{
		throw Error("Unreconixed message type"+message.type);
	} */
});