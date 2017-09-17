import { Component } from '@angular/core';
import {itemClass} from './item.service';


@Component({
  selector: 'my-app',
  template: `<h1 class="well" style="text-align: center">Groceries list</h1>
  <shopping-list></shopping-list>
  <item-compo></item-compo>`,
  providers:[itemClass]
})
export class AppComponent  { name = 'Angular'; }
