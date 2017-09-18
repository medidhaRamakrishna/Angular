import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as global from './globalValue';

@Injectable()
export class ServiceClass{
   
userName:any;
userName1:any;

constructor(private _http:Http){

}
setName(userName:any){
    if(userName){
 this.userName=userName;
 localStorage.setItem('userName1',this.userName);
  }
        
         
}
gwt
//User Information
getData(){
    

return this._http.get("https://api.github.com/users/"+this.userName)
.map(response=>response.json());
}
//Repositries Information
getReposData(){ 
    
    
    return this._http.get("https://api.github.com/users/"+localStorage.getItem('userName1')+"/repos")
    .map(resp=>resp.json());
}
//Commits History
getCommits(){
    return this._http.get("https://api.github.com/users/"+this.userName+"/events")
    .map(resp=>resp.json());
}

//getting followers
getFollowers(){
    return this._http.get("https://api.github.com/users/"+localStorage.getItem('userName1')+"/followers")
    .map(resp=>resp.json());
}
//getting Gists
getGists(){
    return this._http.get("https://api.github.com/users/"+localStorage.getItem('userName1')+"/gists")
    .map(resp=>resp.json());
}
//getting Following
getFollowing(){
    return this._http.get("https://api.github.com/users/"+localStorage.getItem('userName1')+"/following")
    .map(resp=>resp.json());
}
getDataforUrl(_url:any){
 return this._http.get(_url);
}
}
