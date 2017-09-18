import {Component} from '@angular/core';
import {ServiceClass} from'./app.service.componet';

@Component({
selector:'followers',
template:`<h2>Followers</h2>
<div class="panel-heading" *ngFor="let resp of Data">{{resp.login}}</div>
<div class="panel-body" >
<div class="row">
    <div class="col-md-2">
<img [src]=resp.avatar_url class="img-thumbnail" style="width:40%;height:40%" >
    </div>
    <div class="col-md-8">
        
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