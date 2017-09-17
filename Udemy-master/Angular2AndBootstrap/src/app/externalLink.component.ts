import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect',
  template: 'redirecting...'
})
export class RedirectComponent  {
  constructor() { }

  ngOnInit() {
    //window.location.href = 'http://www.google.com'
  }
}