import {Component} from '@angular/core';
import{ itemClass} from './item.service'; 
import{Http} from '@angular/http';


@Component({
selector:'item-compo',
template:`Hello`
})
export class ItemComponet{
    public Items:PropertiesCls[];

constructor(private _service:itemClass,private http:Http){
    console.log('Service Initialized.........');
       this._service.getItems()
    .subscribe(task=>{
       this.Items=task;
    });
}



useAddItem(){

}
useUpdateItem(){

}
useDeleteItem(){

}


}


export class PropertiesCls{
name:String;
password:String;
}