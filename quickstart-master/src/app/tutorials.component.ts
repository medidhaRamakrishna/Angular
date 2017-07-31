import {Component} from '@angular/core';

@Component({
    selector:'my-tutorial',
    template:`<h1>{{title}}</h1>
    <img [src]="imgLink">
    <h4>New H4 tags</h4>
    <div [class.myClass]="applyClass">Class applied </div>
    <div [style.color]="applyRed ? 'red':'blue'">Inline CSS </div>
    <input type="text" value="Angular" #input1>
    <button (click)="onClickfun($event)">Click Me</button>
    <h2>Two Way data binding</h2>
    <input type="text" [(ngModel)]="fname"  >
    <input type="text" [(ngModel)]="lname">
    {{fname}}{{lname}}
    `,
    styles:[`
    .myClass{
        color:yellow;
    }
    `]
})
export class TutorialsComponent{
    public title="Hello World from RK";
    public imgLink="http://lorempixel.com/400/200";
    public  applyClass=true;
     applyRed=false;
    public fname;
    public lname;
    onClickfun(input1){
        alert(input1);
        console.log(input1);
    }
}