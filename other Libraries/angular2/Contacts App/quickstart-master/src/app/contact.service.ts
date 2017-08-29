import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class contactService{
 _url:any='./app/contact.Details.json';
constructor(private _http:Http){}
getContacts(){

return    this._http.get(this._url)
    .map((resp:Response)=>resp.json());
}

}