
const os=require('os');  
console.log("os.freemem(): \n",os.freemem());  
console.log("os.homedir(): \n",os.homedir());  
console.log("os.hostname(): \n",os.hostname());  
console.log("os.endianness(): \n",os.endianness());  
console.log("os.loadavg(): \n",os.loadavg());  
console.log("os.platform(): \n",os.platform());  
console.log("os.release(): \n",os.release());  
console.log("os.tmpdir(): \n",os.tmpdir());  
console.log("os.totalmem(): \n",os.totalmem());  
console.log("os.type(): \n",os.type());  
console.log("os.uptime(): \n",os.uptime());  

console.log('global Objects in NodeJs')

console.log("You are in "+__dirname+" Directory \n ");
console.log("You are in "+__filename+" file");

var a=1;

/*Node.js Timer

Node.js Timer functions are global functions. You don't need to use require() function in order to use timer functions. Let's see the list of timer functions.

setImmediate(): It is used to execute setImmediate.
setInterval(): It is used to define a time interval.
setTimeout(): ()- It is used to execute a one-time callback after delay milliseconds.

Clear timer functions:

clearImmediate(immediateObject): It is used to stop an immediateObject, as created by setImmediate
clearInterval(intervalObject): It is used to stop an intervalObject, as created by setInterval
clearTimeout(timeoutObject): It prevents a timeoutObject, as created by setTimeout
*/

setTimeout(function(){
    console.log('setTimeout'+a++);
},0);
console.log('ssssssss');
var t1=setInterval(function(){
    console.log("a++ T1="+a++);
},1000);
var t2=setInterval(function(){
    console.log("a++ t2="+a++);
    if(a==10){
        clearInterval(t1);
    }
},1000);
//recursive function
var recursive=function(){
    console.log("Recursive function called");
    var t3=setInterval(recursive,100);
    clearInterval(t3);
}
recursive();