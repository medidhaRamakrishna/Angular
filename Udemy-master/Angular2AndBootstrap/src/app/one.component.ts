import {Component,Input,OnInit} from '@angular/core';
import {ServiceClass} from './app.service.componet';



@Component({
selector:'one',
template:`<h1>ONE COmponent</h1>
<div class="container">
<ul class="list-group" *ngFor="let data of _reposData">
        <li class="list-group-item active"><strong>Project Name:</strong>{{data.name}}</li>
        <li class="list-group-item"><strong>Description:</strong>{{data.description}}</li>   
        <li class="list-group-item"><strong>Created:</strong>{{data.created_at|date}}</li>
        <li class="list-group-item"><strong>Pushed at:</strong>{{data.pushed_at|| date}}</li>
        
        </ul>
</div>
`,
providers:[ServiceClass]
})
export class OneComponent implements OnInit{
@Input() _reposData:any;

 arr1:any=[];
 reposData:any;
 commitsHis:any;
  constructor(private _Service:ServiceClass){
    this._Service.getReposData(data)
    .subscribe(res=>this.reposData=res);
  this._Service.getCommits(data)
  .subscribe(res=>this.commitsHis=res);
  console.dir(this.commitsHis);
  }
  ngOnInit(){}
  

  
  
  

}