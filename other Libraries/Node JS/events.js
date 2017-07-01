var events=require("events");
var emitter=new events.EventEmitter();
emitter.on("addUser",function(one,two){
	console.log("AddUser Event Fired"+one,two);
	});
	
	emitter.on("addUser",function(one,two){
	console.log("AddUser Event Fired"+one,two);
	});
	emitter.emit("addUser","userName","pSWD");
	console.log(events.EventEmitter.listenerCount(emitter,"addUser"));