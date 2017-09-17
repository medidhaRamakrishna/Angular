import {Component} from '@angular/core';
import{ itemClass} from './item.service';



@Component({
selector:'item-compo',
template:`Hello`
})
export class ItemComponet{
    public Items:PropertiesCls[];

constructor(private _service:itemClass){
 this._service.getItems();
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