import { Component,ElementRef,OnInit } from '@angular/core';
import {ServiceClass} from './app.service.componet';
import {OneComponent} from './one.component';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import {Subject} from 'rxjs/Rx';
import  'datatables.net';
//var $=require('jquery');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
 /* template:`App Started
  <nav><a routerLink='/One'>Link1</a>
  <a routerLink="/two">Link2</a></nav>
  
  <router-outlet></router-outlet>
  `*/,   styleUrls: ['./app.component.css'],
  providers:[ServiceClass]
})
export class AppComponent implements OnInit {
  title = 'app';
   resp:any;
   reposData:any;
   inputVal:any;
   public Cliked=false;
   
root:any;
commitsHis:any='';
 constructor(private _Service:ServiceClass,private rootNode:ElementRef){
this.root=rootNode;
   console.log('response'+this.resp);

 }
 ngOnInit(){

//$('#example').dataTable(); 
 }

onClk(userInfo:any){
  alert();
  /*for Every User Click the previous data should be cleared*/
  this.resp='';
  this.reposData='';
  this.commitsHis="";
this.inputVal=userInfo;
this._Service.getData(this.inputVal)
.subscribe(res=>this.resp=res);
console.log(this.resp);  
if(userInfo){
   this.Cliked=true;
  
}
this.renderReposdata(this.inputVal,this.fun);
}
debugger;
renderReposdata(data:any,fun){
  this._Service.getReposData(data)
  .subscribe(res=>this.reposData=res);
this._Service.getCommits(data)
.subscribe(res=>this.commitsHis=res);
console.dir(this.commitsHis);
setTimeout(function(){
fun();
},3000);

}

fun(){
  
  (<any>$('#example')).dataTable(); 
}

}
