var events=require("events");
var util=require("util");//for inheriting
LIBClient=function(stream){
	events.EventEmitter.call(this);
	var self=this;
	var buffer="";
	stream.on("data",function(data){
		buffer+=data;
		var boundary=buffer.indexOf("\n");
	while(boundary+=-1){
		var input=buffer.substr(0,boundary);
		buffer=buffer.substr(boundary+1);
		self.emit("message",JSON.parse(input));
		boundary=buffer.indexOf("\n");
	}
	});
}
util.inherits(LIBClient,events.EventEmitter);
exports.LIBClient=LIBClient;
exports.connect=function(stream){
	
	return new LIBClient(stream);
}