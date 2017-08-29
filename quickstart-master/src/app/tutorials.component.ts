import {Component} from '@angular/core';
import {NgSwitch} from '@angular/common';
import {EventEmitter} from '@angular/core';
@Component({
    selector:'my-tutorial',
    template:`<h1>{{title}}</h1>

<input type="text" placeholder="child"  #childText (keypress)="onChange(childText.value)">
{{parentData}}
    <img [src]="imgLink">
    <h4>New H4 tags</h4>
    <div [class.myClass]="applyClass">Class applied </div>
    <div [style.color]="applyRed ? 'red':'blue'">Inline CSS </div>
    <input type="text" value="Angular" #input1>
    <button (click)="onClickfun($event)">Click Me</button>
    <h2>Two Way data binding</h2>
    <input type="text" [(ngModel)]="fname"  placeholder="fname">
    <input type="text" [(ngModel)]="lname" placeholder="lname">
   Full name: {{fname}}-{{lname}}
   <input type="text"  >
   <p *ngIf="element">show and hide paragraph</p>
   <div [ngSwitch]="color">
<p *ngSwitchCase="'red'">Red color is shown</p>
<p *ngSwitchCase="'green'">Green color is shown</p>
<p *ngSwitchDefault>yellow color is shown</p>
   </div>
   <ul>
   <li *ngFor="let c of col1">{{c}}</li>
   </ul>
<button (click)="toggleClass()">apply and remove class</button>
   <div [ngClass]="{'myClass':cone,'myClass2':ctwo}">Ng class hide and show</div>
   <div [ngStyle]="{'font-style':font,'font-size':size}">Ng  Style attribute</div>

    `
    ,inputs:['parentData']
    ,outputs:['childEvent'],
    styles:[`
    .myClass{
        color:yellow;
    }
    .myClass2{
        background-color:black;
    }
    `]
})
export class TutorialsComponent{
    childEvent=new EventEmitter<String>();
     onChange(value:String){
this.childEvent.emit(value);
    }
    parentData:String;
    cone:boolean=true;
    ctwo:boolean=true;
    element:boolean=false;
    size:String="20px";
    font:String="italic";
    color:string="greesn";
    public col1:any=['red','blue','green',1,2,3];
    public title: String="Hello World from RK";
    public imgLink:String="http://lorempixel.com/400/200";
    public  applyClass:boolean=true;
     public applyRed:boolean=false;
    public fname:String;
     onClickfun(input1 :String){
        alert(input1);
        console.log(input1);
        alert('lname');
    }
    toggleClass(){
        this.cone=!this.cone;
        this.ctwo=!this.ctwo;
    }
}