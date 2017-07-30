
import {Component,Input} from '@angular/core';
declare const module;//if latest CLI no need

 @Component({
selector:'search-box',
moduleId:module.id, //if latest CLI no need
templateUrl:`search-box.Component.html`,
styleUrls:['search-box.Component.css']
})
export class searchBox{
@Input('placeholder')
text='Type Your Seach';
clear(input){
    console.log('clear.........');
    input.value='';
}
}