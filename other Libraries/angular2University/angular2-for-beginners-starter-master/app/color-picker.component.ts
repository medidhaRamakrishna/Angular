import {Component,Input,Output} from '@angular/core';

@Component({
    selector:'color-picker',
    template:`<div class="color-title" [ngStyle]="{'color':color}">Pick a Color</div>
    <div class="color-picker">
    <div class="color-sample color-sample-blue" (click)="choose('${BLUE}')">blue</div>
    <div class="color-sample color-sample-red" (click)="choose('${RED}')">red</div>
    </div>
    `,
    styles:[`
    .color-sample{
    width: 100px;
    border: 25px ;
    padding: 25px;
    margin: 25px;
    
}
.color-sample-blue{
    background:blue;
}
.color-sample-red{
    background:red;
}
    `]
})

export class colorPicker{
    @Input()
    color:String;
@Output("color")
colorOutput=new EventEmitter();

choose(color:String){
this.colorOutput.emit(color);    
}
}
