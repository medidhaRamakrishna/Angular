const express=require('express');
const router=express.Router();//here router is middle ware we are going to mount it in index.js file at  /api path
const Ninja=require('./models/ninjas')
//get list of ninjas form DB
router.get('/ninjas',function(req,resp,errHandler){
    console.log(req.query)
Ninja.geoNear(
    {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]
    },{maxDistance:100000,spherical:true }
).then(function(nearNijas){
resp.send(nearNijas);
});



//resp.send({type:'GET'});
/*Ninja.find({}).then(function(ninjasFound){
resp.send(ninjasFound);
});*/
});

//add a new ninja to the  DB
router.post('/ninjas',function(req,resp,errHandler){
/*var ninja=new Ninja(req.body);
ninja.save();*/
Ninja.create(req.body).then(function(ninja){
resp.send(ninja);

}).catch(errHandler);

});
//update a ninja to the DB
router.put('/ninjas/:id',function(req,resp,errHandler){
Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
Ninja.findOne({_id:req.params.id}).then(function(updatedVal){
resp.send(updatedVal);
});

});




});

//delete a ninja form DB
router.delete('/ninjas/:id',function(req,resp,errHandler){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(deleted){
resp.send(deleted);
    })
//console.log(req.params.id);
//resp.send({type:'DELETE'});

});

module.exports=router;