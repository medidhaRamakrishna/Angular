var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://SYSTEMI:welcome*123@ds121494.mlab.com:21494/mydb', ['TaskCollection']);

//to get all the tasks
router.get('/tasks', function (req, resp, next) {
	//resp.send('task API');
	db.TaskCollection.find(function (err, tasks) {
		if (err) {
			resp.send(err);
		}
		resp.send(tasks);

	})

});

//to get Single Task
router.get('/task/:id', function (req, resp, next) {
	//resp.send('task API');
	db.TaskCollection.findOne({
		_id : mongojs.ObjectId(req.params.id)
	}, function (err, tasks) {
		if (err) {
			resp.send(err);
		}
		resp.send(tasks);

	});

});

//To save data to db
router.post('/task',function(req, resp, next){
var task=req.body;
console.log(task.title);
console.log(task.isDone);
if(!task.title || !(task.isDone+"")){
    resp.sendStatus(400);
    resp.json({
        "error":'Bad Request'});
}else{
db.TaskCollection.save(task,function(err,task){
if (err) {
			resp.send(err);
		}
		resp.send(task);

	});
}});

//DELETE TASK FROM DB
router.delete('/task/:id', function (req, resp, next) {
	//resp.send('task API');
	db.TaskCollection.remove({_id : mongojs.ObjectId(req.params.id)	}, function (err, tasks) {
		if (err) {
			resp.send(err);
		}
		resp.setHeader('content-type', 'text/json');
		resp.send(tasks);
		

	});

});

//Update TASK in DB
router.put('/task/:id', function (req, resp, next) {
	var taskbody=req.body;
    var updateTask={};
    if(taskbody.isDone){
        updateTask.isDone=taskbody.isDone;
    }
    if(taskbody.title){
   updateTask.title=taskbody.title;
    }
    if(!updateTask){
        resp.sendStatus(400);
        resp.json({
            "error":"Bad Data"
        });
    }else{
db.TaskCollection.update({_id : mongojs.ObjectId(req.params.id)	},updateTask,{}, function (err, tasks) {
		if (err) {
			resp.send(err);
		}
		resp.send(tasks);

	});
    }
	

});


module.exports = router;
