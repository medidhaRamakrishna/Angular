import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `<h1 class="well">Basic Angular2 Application to Perform CRUD Operations</h1>
  <shopping-list></shopping-list>`,
})
export class AppComponent  { name = 'Angular'; }
