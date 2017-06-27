angular.module("tutorialCtrlModule",[])

.controller("TutorialCtrl",["$scope",function($scope){

	$scope.tutorialobject = {};
	$scope.name="thomas";	
	$scope.tutorialobject.bindoutput = 2;
	$scope.tutorialobject.firstName = "Belly";
	$scope.tutorialobject.lastName = "Barder"
	$scope.timesTwo = function(){
		$scope.tutorialobject.bindoutput += 2;
	}
}])
.controller("TutorialCtrl2",["$scope"],function($scope){
	$scope.secondTutorial = "This is the second Tutorial";
})
