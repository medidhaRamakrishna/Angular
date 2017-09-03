import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {taskComponent} from './Task.component';

@Injectable()
export class TaskService{
    constructor(private _http:Http){
        console.log('Task Service Initialized...');
    }

    getTasks(){
        return this._http.get('http://localhost:8888/api/tasks')
        .map(res=>res.json());
    }

addTasks1(newTask:any){
console.log(newTask);
var headers=new Headers();
headers.append('Content-Type','application/json');
return this._http.post('http://localhost:8888/api/task',JSON.stringify(newTask),{headers:headers})
.map(res=>res.json());
}

deleteTasks(id:any){
return this._http.delete('http://localhost:8888/api/task/'+id)
.map(res=>{
    res.json();
});
}
updateStatuscheckBox(updatetask:any){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this._http.put('http://localhost:8888/api/task/'+updatetask._id,JSON.stringify(updatetask),{headers:headers})
.map(res=>{res.json()})
}

}
