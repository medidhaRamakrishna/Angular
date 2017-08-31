import {Component} from '@angular/core';
@Component({
selector:'shopping-list',
template:`
<ul class="container">
<li *ngFor="let item of Items_List" (click)="editItem(item)">{{item.name}}&nbsp;&nbsp;&nbsp;<button (click)="deleteItem(item)"><span style="color:red">X</span></button></li>
</ul>
<input type="text" [(ngModel)]="selectedItem.name" #itemRef>
<button (click)="addItem(itemRef)">Add Item</button>
`
})

export class shopingList{
 public Items_List:any=[{name:'Milk'},
 {name:'Bread'},
 {name:'Sugar'},
 {name:'Rice'}];
public selectedItem:any={name:""};
editItem(item:any){
this.selectedItem=item;
}
addItem(itemRef:any){
    if(itemRef. value!='')
this.Items_List.push({name:itemRef.value})
}
deleteItem(item:any){
this.Items_List.splice(this.Items_List.indexOf(item),1);
}
}