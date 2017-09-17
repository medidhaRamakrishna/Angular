import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {shopingList} from './shoping-list.component';
import {ItemComponet} from './item.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule ],
  declarations: [ AppComponent ,shopingList,ItemComponet],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
