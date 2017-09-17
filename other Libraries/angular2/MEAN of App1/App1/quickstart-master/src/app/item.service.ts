import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {ItemComponet} from './item.component';

@Injectable()
export class itemClass{

constructor(private _http:Http){}

getItems(){
    return this._http.get('http://localhost:3001/api/items')
    .map(resp=>resp.json());
}

createItem(item:any){
var headers=new Headers;
headers.append('Content-Type','application/json');

    return this._http.post('http://localhost:3001/api/item',JSON.stringify(item),{headers:headers})
    .map(resp=>resp.json());
}

updateItem(item:any){
var headers=new Headers();
headers.append('Content-Type','application/json');
return this._http.post('http://localhost:3001/api/item/'+item._id,JSON.stringify(item),{headers:headers})
.map(resp=>resp.json());
}

deleteItem(id:any){

return this._http.delete("http://localhost:3001/api/item/"+id)
.map(resp=>resp.json());
}



}