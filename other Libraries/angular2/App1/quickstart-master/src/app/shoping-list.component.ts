import {Component} from '@angular/core';
@Component({
selector:'shopping-list',
template:`<div>
<div class="form-group contacts1"><input type="text"  maxlength="20" [(ngModel)]="selectedItem.name" #itemRef>
<button (click)="addItem(itemRef)">Add Item</button>
<table  border="1" class="container" class="contacts">
<tr *ngFor="let item of Items_List  " (click)="editItem(item)" >
<td>{{item.name}}</td>
<td><button (click)="deleteItem(item)" class="glyphicon glyphicon-trash">Delete</button></td>
</tr>
</table>
</div>
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
    if(itemRef.value!='')
this.Items_List.push({name:itemRef.value})
}
deleteItem(item:any){   
this.Items_List.splice(this.Items_List.indexOf(item),1);
}
}