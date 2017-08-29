import { Component,OnInit } from '@angular/core';//OnInit for form builder
import {TutorialsComponent} from './tutorials.component';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {EmpService} from './employee.service';
//decorator
@Component({
  selector: 'my-app',
  /*template: `<h1>Hello {{name}}</h1>
  <input type="text" #pText (keypress)="0" placeholder="parentData1">
CHILD DATA:{{childData |uppercase}}
enter:{{pText.value|slice:'1':pText.value.length-2}}
{{date|date:'fullDate'}}
{{1.98|currency:'INR  ':true}}

   <!--my-tutorial (childEvent)="childData=$event" [parentData]="pText.value"></my-tutorial-->
   
 `*/
 
 /*templateUrl:'template_form1.html'*/
 /*templateUrl:'model_driven_form_template.html',*/
 
 template:`<!--emp-Details></emp-Details><Emp-List></Emp-List-->
<nav>
<a routerLink='/List' routerLinkActive="active">Emp List</a>
<a routerLink="/Details" routerLinkActive="active">Emp Details</a>
</nav>
<router-outlet></router-outlet>

 `,
    styles:[`h1{float:center;color:red;} 
    input.ng-valid{
      border-left:solid green 4px;
    }
    input.ng-invalid{
      border-left:solid red 4px;
    }

    `],
    providers:[EmpService]
})
export class AppComponent  {
  //contactForm:FormGroup;
/* name = 'Ramakrishna'; 
public childData:String; 
date=new Date();
public myName="NAREDRA";
onSubmitfun(value:any){
console.log(value);

}*/

contactForm=new FormGroup({
  Name:new FormControl('Naredra',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
  Email:new FormControl(),
  address:new FormGroup({
Street:new FormControl(),
City:new FormControl(),
postalcode:new FormControl(null,Validators.pattern('^[1-9][0-9]{4}$'))
  })


});
modelDriven(){
console.log(this.contactForm.value);
}
/*constructor(private _formBuilder:FormBuilder){}
OnInit(){
this.contactForm=this._formBuilder.group({
Name:['NAREDRA',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
Email:[],
address:this._formBuilder.group({
 Street:[],
  City:[],
  postalcode:[null,[Validators.pattern('^[1-9][0-9]{4}$')]]
})
});
}
modelDriven(){
  console.log(this.contactForm.value);
}*/


}
