import {Component,OnInit} from '@angular/core';
import {EmpService} from './employee.service';

@Component({
selector:'emp-Details',
template:`
<h1>hello from employee</h1><h3>{{errMsg}}</h3>
<ul>
<li *ngFor="let x of EMP">{{x.name}}-{{x.age}}-{{x.sex}}</li>
</ul>
`

})
export class EmpDetails implements OnInit{
public EMP:any=[];
errMsg:String;
constructor(private _EmpService:EmpService){}
ngOnInit(){
  this._EmpService.getEmployees()
  .subscribe(respData=>this.EMP=respData,respErr=>this.errMsg=respErr);
}
}