import {Component} from '@angular/core';
@Component({
selector:'shopping-list',
template:`<div>
<div class="form-group contacts1">

<input type="text" [hidden]="!toggle"   #itemRef maxlength="100" >
<button (click)="addItem(itemRef)" [hidden]="!toggle">Add Item</button>
<input type="text" [hidden]="toggle"  [(ngModel)]="selectedItem.name" maxlength="100" Placeholder="edit">
<button  [hidden]="toggle" (click)="toggleShow()" >Edit Done</button>
<div class="card">
<table  border="1" class="container" class="contacts">
  <colgroup>
       <col span="1" style="width: 90%;">
       <col span="1" style="width: 10%">
       </colgroup>
<tr *ngFor="let item of Items_List" (click)="editItem(item)" class="list-group">
<td  title="Click to edit" class="list-group-item"><span >{{item.name}}</span></td>
<td > 
<button (click)="deleteItem(item)" class="glyphicon glyphicon-trash" ></button></td>
</tr>
</table>
</div>
</div>
`
})

export class shopingList{
    public toggle:boolean=true;
 public Items_List:any=[{name:'Milk'},
 {name:'Bread'},
 {name:'Sugar'},
 {name:'Rice'}];
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
    this.duplicateVal=this.Items_List.filter(function(obj){
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