var app=angular.module('myApp',[]);
app.controller('contactController',contactsFunction);

function contactsFunction($scope,){
$scope.enabledEdit =[];
//  $scope.First_Name='jhsdgvjhsdghvj';
$scope.editContact=function(index){
    console.log("edit index"+index);
	$scope.enabledEdit[index] = true;    
}
  $scope.contactList = [
{
"firstName": "Joe",
"lastName": "Perry",
"contactNumber": "444-888-1223",
"contactEmail": "joe@cordis.us"
},
{
"firstName": "Kate",
"lastName": "Will",
"contactNumber": "244-838-1213",
"contactEmail": "kate@cordis.us"
},
{
"firstName": "Harry",
"lastName": "Robert",
"contactNumber": "744-138-1292",
"contactEmail": "harry@cordis.us"
},
{
"firstName": "Tom",
"lastName": "Bill",
"contactNumber": "241-188-1191",
"contactEmail": "tom@cordis.us"
},
{
"firstName": "Roger",
"lastName": "Steel",
"contactNumber": "111-177-1231",
"contactEmail": "roger@cordis.us"
}
];
}