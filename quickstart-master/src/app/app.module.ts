import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent }  from './app.component'; 
import {TutorialsComponent} from './tutorials.component';
import {FormsModule} from '@angular/forms';
//import {EmpDetails} from './employeeDetails.component';
//import {EmpList} from './employeelist.component';
import {AppRoutingModule,routingComponents} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


@NgModule({
  imports:      [ BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,AppRoutingModule
 /* RouterModule.forRoot([
    {path:'List',component:EmpList},{path:'Details',component:EmpDetails }
  ])*/
   ],
  declarations: [ AppComponent,TutorialsComponent,routingComponents/*EmpDetails,EmpList*/],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
