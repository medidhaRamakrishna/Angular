var express=require('express');
var app=express(); 
var PORT=process.env.PORT || 3000;
app.all('/*',function(req,res){
    res.send(`<!DOTYPE html>
    <head>
    <title>Mean To Do APP</title>
    </head>
    <body>
    <h1>Hello,This is the App</h1>
    </body>
</html>
    `);
});

app.listen(PORT,function(){
    console.log('Server running on'+PORT);
});