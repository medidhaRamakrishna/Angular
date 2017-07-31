import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component'; 
import {TutorialsComponent} from './tutorials.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule,FormsModule ],
  declarations: [ AppComponent,TutorialsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
