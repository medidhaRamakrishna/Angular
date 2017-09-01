import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `<h1 class="well" style="text-align: center">Groceries list</h1>
  <shopping-list></shopping-list>`,
})
export class AppComponent  { name = 'Angular'; }
