import { Component } from '@angular/core';
import {TutorialsComponent} from './tutorials.component';
//decorator
@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
   <my-tutorial></my-tutorial>
 `,
    styles:[`
    h1{
float:center;
color:red;

    }
    `]
})
export class AppComponent  { name = 'Ramakrishna'; }
