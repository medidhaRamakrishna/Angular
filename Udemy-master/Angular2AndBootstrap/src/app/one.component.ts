import {Component} from '@angular/core';
import {ServiceClass} from './app.service.componet';

@Component({
selector:'one',
template:`ONE
<div>
<div *ngFor="let val of arr1">{{val}}</div>
</div>
`
})
export class OneComponent{

 arr1:any=[];
  constructor(private _service:ServiceClass){

  }
}