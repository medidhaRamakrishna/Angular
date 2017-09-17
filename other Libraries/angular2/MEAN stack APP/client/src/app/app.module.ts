import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {shopingList} from './shoping-list.component';
import {taskComponent} from './Task.component';
import {TaskService} from './Task_service.component';
import {BarChartDemoComponent} from './ui_components/charts.component';

//UI components
import {AmexioWidgetModule,CommonHttpService} from 'amexio-ng-extensions';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,AmexioWidgetModule ],
  declarations: [ AppComponent ,shopingList,taskComponent,BarChartDemoComponent],
  providers:[CommonHttpService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
