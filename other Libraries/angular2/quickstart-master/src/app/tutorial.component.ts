import { Component } from '@angular/core';
//import { TutorialComponent } from './tutorial.component';
import { PostsService } from  './services/posts.services';
@Component({
  selector: ' my-tutorial',
  template: `<h1>Hello {{name}}</h1>
  <p><strong>Address</strong> : {{address.street}},{{address.village}},{{address.city}},{{address.state}},{{address.country}}
   </p>
   <button (click)="toggleHobbies()">{{ showHobbies ?"Hide Hobbies":"Show Hobbies"}} </button>
   <div *ngIf="showHobbies">
   <h3>Hobbies :</h3>
   <ul>
   <li *ngFor="let h of hobbies; let i=index">
    {{h}}<button (click)="deleteHobby(i)">Delete</button>
   </li>
   </ul>
   </div>
 <form (submit)="addHobbies(hobby.value)">
    <label>hobbies:
    <input type="text" #hobby ></label><br/>
 </form>
 <form>
   <label>Name:
   <input type="text" name="name" [(ngModel)]="name"></label><br/>
   <label>Street:
   <input type="text" name="address.street" [(ngModel)]="address.street"></label><br />
   <label>Village:
   <input type="text" name="address.village" [(ngModel)]="address.village"></label><br />
   <label>City:
   <input type="text" name="address.city" [(ngModel)]="address.city"></label><br />
 </form>
             `,
providers:[PostsService]
})
export class TutorialComponent  { 
name:String ; 
address:address;
hobbies:string[];
showHobbies:boolean;
constructor(private postsService:PostsService){
   // this.name="Medidha Ramakrishna Reddy";
  this.name = 'Ramakrishna Medidha';
   this.hobbies=["Movies","Listening to Music","Dancing","Singing"] ;
  this.address={
         street:"Hanuman Street",
         village:"GopalPur",
         city:"Karimnagar",
         state:"Telangana",
         country:"India"

}
this.showHobbies=false;
this.postsService.getPosts().subscribe(posts=>{
    console.log(posts);
});
}
toggleHobbies(){
    console.log("toggleHobbies");
    if(this.showHobbies==true){
        this.showHobbies=false;
    }else{
        this.showHobbies=true;
    }

}
addHobbies(hobby){
console.log(hobby);
this.hobbies.push(hobby);

}
deleteHobby(i){
this.hobbies.splice(i,1);    
}
}

interface address{
    street:string;
    village:string;
    city:string;
    state:string;
    country:string;
    
}