const dns = require('dns');  
for(var i=170;i<=175;i++){
    for(var j=170;j<=175;j++){
        for(var k=170;k<=175;k++){
            for(var l=170;l<=175;l++){
dns.lookupService(i+'.'+j+'.'+k+'.'+l, 22, (err, hostname, service) => {  
  console.log(hostname, service);  
    // Prints: localhost  
}); 
            }   
        }
    }
}
