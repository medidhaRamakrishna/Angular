var app=angular.module('myApp',[]);
app.controller('COntrollerOne',controllerFun);
function controllerFun(){
this.name="John Cena";
this.Uesrdate=new Date();

}

app.directive('student',function(){
    
    var directive={};
    directive.restrict='E';
    directive.template="Name:<b>{{student.name}}</b>";
    directive.scope={
        student:"=name"
    }
    return directive;
});


