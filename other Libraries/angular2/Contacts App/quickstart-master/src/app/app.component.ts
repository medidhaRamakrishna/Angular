import { Component } from '@angular/core';



@Component({
  selector: 'my-app',
 template: `<!--h1>Hello {{name}}</h1>
 <add-contact></add-contact>
 <show-contact></show-contact-->
 <nav>
 
 <a routerLink='/addContact'>addContact</a>
 <a routerLink='/showContact'>showContact</a>
 
 </nav>
 <router-outlet></router-outlet>
 `,
 providers:[]
 /*templateUrl:'./userRegistration.html'*/
})
export class AppComponent  { name = 'Angular'; 

}
