var httpSrv=require("http");
var serverSrv=httpSrv.createServer(function(Req,Resp){
console.log("got request");
var name='John';

console.warn(`don't mess with me ${name}`);
Resp.writeHead(200,{'cotent-type':'text/plain'});;
Resp.end('Hello world');
});
serverSrv.listen(3000);
