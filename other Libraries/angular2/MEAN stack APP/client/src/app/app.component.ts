import { Component } from '@angular/core';
import {TaskService} from './Task_service.component';


@Component({
  selector: 'my-app',
  template: `<h1 class="well" style="text-align: center">Groceries list</h1>
  <shopping-list></shopping-list>
  <task-list></task-list>
  <barchart-demo></barchart-demo>
  `,
  providers:[TaskService]
})
export class AppComponent  { name = 'Angular'; }
