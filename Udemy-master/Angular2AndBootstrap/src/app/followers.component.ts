import {Component} from '@angular/core';
import {ServiceClass} from'./app.service.componet';

@Component({
selector:'followers',
template:`<h2>Followers</h2>
<div *ngFor="let resp of Data" class="panel panel-primary">
<div class="panel-heading" >{{resp.login}}</div>
<div class="panel-body" >
<div class="row">
<img [src]=resp.avatar_url class="img-thumbnail" style="width:10%;height:10%" >
</div>
</div>
</div>

`,
providers:[ServiceClass]
})
export class FollowersComponet{
Data:any;

constructor(private _service:ServiceClass){

 this._service.getFollowers()
  .subscribe(resp=>this.Data=resp); 
}

}