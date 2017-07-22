const net=require('net');
const client=net.connect({port:55500},()=>
{
    console.log('connected to server');
 client.write('World \r \n');
});

client.on('data',(data)=>{

    console.log(data.toString());
    setTimeout(function(){client.end();},10000);

});

client.on('end',()=>{
    console.log('disconnected from server');
});