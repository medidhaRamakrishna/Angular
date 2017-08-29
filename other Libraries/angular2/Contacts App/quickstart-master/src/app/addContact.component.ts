import {Component} from '@angular/core';



@Component({
  selector:'add-contact'  ,
  templateUrl:'./userRegistration.html'
})
export class addContact{
    
    
onSubmit(data:any,fname:any){
    console.dir(data);
   
}
}