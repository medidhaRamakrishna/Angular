


import {Component} from "@angular/core";
import {NgModule} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserModule} from "@angular/platform-browser";
import {searchBox} from './search-box.component'
import {colorPicker} from './color-picker.component'



@Component({
selector:'my-app',
template:`<search-box [placeholder]="'Custom Place holder'"></search-box>
<color-picker color="red"></color-picker>`
})
export class App{

}
 
@NgModule({
    declarations: [App,searchBox,colorPicker],
    imports: [BrowserModule],
    bootstrap: [App]
})
export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);


