import { Component } from '@angular/core';
import {TutorialsComponent} from './tutorials.component';
//decorator
@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
   <my-tutorial></my-tutorial>
 `
})
export class AppComponent  { name = 'Ramakrishna'; }
