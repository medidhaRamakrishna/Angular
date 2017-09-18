import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class ServiceClass{


constructor(private _http:Http){

}
getData(userName :any){

return this._http.get("https://api.github.com/users/"+userName)
.map(response=>response.json());
}

getReposData(userName:any){
    return this._http.get("https://api.github.com/users/"+userName+"/repos")
    .map(resp=>resp.json());
}

getCommits(userName:any){
    return this._http.get("https://api.github.com/users/"+userName+"/events")
    .map(resp=>resp.json());
}

}