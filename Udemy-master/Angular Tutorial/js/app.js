console.log('hgh');
var app=angular.module("tutorialApp",["ngRoute","tutorialCtrlModule"]);
console.log('app.js');
app.config(function($routeProvider){
	$routeProvider

	.when("/",{
		templateUrl : "Views/tutorial.html",
		controller: "TutorialCtrl"
		})
	.when("/tutorialSecond",{
		templateUrl : "Views/tutorialSecond.html",
		controller: "TutorialCtrl2"
		})
});