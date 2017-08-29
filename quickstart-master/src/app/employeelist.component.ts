import {Component,OnInit} from '@angular/core';
import {EmpService} from './employee.service';
 @Component({
selector:'Emp-List',
template:`Hello from emplist
<h3>{{errMsg}}</h3>
<ul>
<li *ngFor="let emp of employees">{{emp.name}}</li>
</ul>`


 })
 export class EmpList implements OnInit{
    public employees:any=[];
    errMsg :String;
     constructor(private _EmpService:EmpService){ 
  
}
ngOnInit(){
this._EmpService.getEmployees()
.subscribe(respData=> this.employees=respData,respErr=>this.errMsg=respErr);
}



 }