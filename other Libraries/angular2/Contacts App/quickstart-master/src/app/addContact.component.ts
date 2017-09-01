import {Component} from '@angular/core';
import {contactService} from './Contacts_services.component';


@Component({
  selector:'add-contact'  ,
  templateUrl:'./userRegistration.html'
})
export class addContact{
    constructor( private contact_serv:contactService){}
    
onSubmit(data:any,fname:any){
    console.dir(data);
  this.contact_serv.addContacts(data);
data='';
}
}