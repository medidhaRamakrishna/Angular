import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/Observable/throw';


@Injectable() 
export class EmpService{
_url='./employee_data.json';

constructor( public _http:Http){

}
getEmployees(){
    return this._http.get(this._url)
    .map((resp:Response)=>resp.json())
    .catch(this._errHandler);
}
_errHandler(error_resp:Response){
console.error(error_resp);
return Observable.throw(error_resp||'Server Error');
}



}