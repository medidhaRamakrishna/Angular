var express=require('express');
var router=express.Router();
var  mongojs=require('mongojs');
var db=mongojs('mongodb://SYSTEMI:welcome*123@ds121494.mlab.com:21494/mydb', ['itemCollection']);
//getting all the 
router.get('/items',function(req,resp,next){
db.itemCollection.find(function(err,items){
if(err){
    resp.send(err);
}
resp.send(items);
});

});

router.get('/item/:id',function(req,resp,next){
db.itemCollection.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,item){
if(err){
    resp.send(err);
}
resp.send(item);
});

});


router.post('/item',function(req,resp,next){
 var body=req.body;

 db.itemCollection.save(body,function(err,data){
if(err){
    resp.send(err);
}
resp.send(data);
});
});

router.put('/item/:id',function(req,resp,next){
var body=req.body;
var updateItem={};
if(updateItem.name){
updateItem.name=body.name;
}


db.itemCollection.update({_id:mongojs.ObjectId(req.params.id)},updateItem,{},function(err,updateddata){
    if(err){
        resp.send(err);
    }
    resp.send(updateddata);
});
});

router.delete('/item/:id',function(req,resp,next){

db.itemCollection.delete({_id:mongojs.ObjectId(req.params.id)},function(err,afterDelete){
if(err){
    resp.send(err);
}
resp.send(afterDelete);
});

});


module.exports=router;