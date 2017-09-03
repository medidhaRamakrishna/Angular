import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {shopingList} from './shoping-list.component';
import {taskComponent} from './Task.component';
import {TaskService} from './Task_service.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule ],
  declarations: [ AppComponent ,shopingList,taskComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
