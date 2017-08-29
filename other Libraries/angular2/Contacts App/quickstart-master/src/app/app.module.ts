import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import{HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {addContact} from './addContact.component';
import {showContact} from './showContact.component';
import {selectedContact} from './selectedContact.component';
@NgModule({
  imports:      [ BrowserModule,FormsModule,CommonModule,HttpModule,
  RouterModule.forRoot([
    
    {path:'addContact',component:addContact},
    {path:'showContact',component:showContact},
    {path:'showContact/:firstName',component:selectedContact}


  ]) ],
  declarations: [ AppComponent,addContact,showContact,selectedContact ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
