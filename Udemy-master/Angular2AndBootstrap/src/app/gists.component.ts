import {Component} from '@angular/core';
import {ServiceClass} from'./app.service.componet';

@Component({
selector:'gists',
template:`<h2>Gists</h2>
This Feature is comming soon...

`,
providers:[ServiceClass]
})
export class GistsComponet{
Data:any;

constructor(private _service:ServiceClass){
/*
 this._service.getGists()
  .subscribe(resp=>this.Data=resp);*/ 


}



}