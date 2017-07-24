const express=require('express');
const router=express.Router();
const contactsCollection=require('./models/contactsModel');


router.get('/contacts',function(req,resp,errMiddleWare){
//resp.send("GET Request faired");
contactsCollection.find({}).then(function(data){
resp.send(data);
}).catch(errMiddleWare);


});


router.post('/contacts',function(req,resp,errMiddleWare){
//resp.send('postedData');
console.log('req.body'+req.body);

contactsCollection.create(req.body).then(function(postedData){
    resp.send(postedData);
}).catch(errMiddleWare);
});

router.put('/contacts/:id',function(req,resp,errMiddleWare){
//resp.send("PUT Request faired");
console.log('req.params.id'+req.params.id);
contactsCollection.findByIdAndUpdate({Contact_Email:req.params.id},req.body).then(function(data){
   contactsCollection.findOne({Contact_Email:req.params.id}).then(function(data){
        resp.send(data);
    });
}).catch(errMiddleWare);
});
//update a ninja to the DB



router.delete('/contacts/:id',function(req,resp,errMiddleWare){
//resp.send("DELETE Request faired");
contactsCollection.findByIdAndRemove({Contact_Email:req.params.id}).then(function(data){
resp.send(data);
});
});

module.exports=router;