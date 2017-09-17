import {Component} from '@angular/core';
import {itemClass } from './item.service';
@Component({
selector:'shopping-list',
templateUrl:'./Groceries_Template.html'
})

export class shopingList{
    public toggle:boolean=true;
 public Items_List:typeclass[];/*{name:'Milk'},
 {name:'Bread'},
 {name:'Sugar'},
 {name:'Rice'}];*/
constructor( private service:itemClass){
    this.service.getItems()
    .subscribe(data=>this.Items_List=data);
}


public selectedItem:any={name:""};
public duplicateVal:any;
editItem(item:any){
this.selectedItem=item;
this.toggle=!this.toggle;
}
toggleShow(){
    this.toggle=!this.toggle;
}
addItem(itemRef:any){
    this.duplicateVal=this.Items_List.filter(function(obj:any){
return obj.name==itemRef.value;
    });
    if(itemRef.value!='' && this.duplicateVal.length==0){
this.Items_List.push({name:itemRef.value})
    }else{
        if(itemRef.value!='')
        alert('Items already Added');
    }
    itemRef.value='';
}
deleteItem(item:any){   
this.Items_List.splice(this.Items_List.indexOf(item),1);
}
}


export class typeclass{
    name:string;
}