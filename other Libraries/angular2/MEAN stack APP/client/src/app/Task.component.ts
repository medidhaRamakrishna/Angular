import { Component} from '@angular/core';
import {TaskService} from './Task_service.component';

@Component({
selector:'task-list',
templateUrl:'./Task_template.html'
})

export class taskComponent{
    public _task:task[];
    public title:String;

constructor(private tskService:TaskService){
    this.tskService.getTasks()
    .subscribe(task=>{
       this._task=task;
    });
}
public addTask(event:any){
    
//event.preventDefault();
console.log(this.title);
var     newTask={
    title:this.title,
    isDone:false
}
this.tskService.addTasks1(newTask)
.subscribe(task=>{
    this._task.push(task);
    this.title='';
})
}
deleteTask(id:any){
    var tasks=this._task;
console.log(tasks);
    this.tskService.deleteTasks(id)
    .subscribe(data=>{
        
            for(var i=0;i<tasks.length;i++){
                if(tasks[i]._id==id){
                    tasks.splice(i,1);
                }
            }
        

    });
}

updateStatus(task:any){
var _tsk={
    _id:task._id,
    title:task.title,
    isDone:!task.isDone
}

this.tskService.updateStatuscheckBox(_tsk)
.subscribe(data=>{
task.isDone=!task.isDone;
});

}
}

export class task{
    title:String;
    isDone:boolean;
}