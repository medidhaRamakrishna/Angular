var event=require("events");
var emitter=new event.EventEmitter();
function handler(){
	console.log("In My Eevnt handler");
}
emitter.on("myEvent",handler);
emitter.emit("myEvent");
emitter.removeListener("myEvent",handler);
emitter.emit("myEvent");