import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component'; 
import {TutorialsComponent} from './tutorials.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent,TutorialsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
