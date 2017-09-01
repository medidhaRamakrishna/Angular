import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class contactService{
 //_url:any='./app/contact.Details.json';
duplicateVal :any;
constructor(){}
public getContacts(){
return    this.AllContacts;
}
public addContacts(data:any){
    this.duplicateVal=this.AllContacts.filter(function(obj:any){
return data==obj;
    });
    if(this.duplicateVal.length==0){
    this.AllContacts.push(data);}
    else{
        alert("Contact already exist");
    }
}

public AllContacts:any = [
{
"firstName": "Joe",
"lastName": "Perry",
"contactNumber": "444-888-1223",
"contactEmail": "joe@cordis.us"
},
{
"firstName": "Kate",
"lastName": "Will",
"contactNumber": "244-838-1213",
"contactEmail": "kate@cordis.us"
},
{
"firstName": "Harry",
"lastName": "Robert",
"contactNumber": "744-138-1292",
"contactEmail": "harry@cordis.us"
},
{
"firstName": "Tom",
"lastName": "Bill",
"contactNumber": "241-188-1191",
"contactEmail": "tom@cordis.us"
},
{
"firstName": "Roger",
"lastName": "Steel",
"contactNumber": "111-177-1231",
"contactEmail": "roger@cordis.us"
}
];


}