import {Component,OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
template:`You are selected Contact={{user_Name}}`
})
export class selectedContact implements OnInit{
    user_Name:String;
constructor(private _ActiveRoute:ActivatedRoute){}
ngOnInit(){
   this.user_Name=this._ActiveRoute.snapshot.params['firstName'];
}

}