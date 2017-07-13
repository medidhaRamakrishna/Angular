var app=angular.module('myApp',[]);
app.controller('contactController',contactsFunction);

function contactsFunction($scope){
$scope.enabledEdit =[];
//  $scope.First_Name='jhsdgvjhsdghvj';
$scope.AddContact=function(){
console.log($scope.firstName);

 if($scope.firstName && $scope.Middle_Name && $scope.lastName && $scope.contactNumber && $scope.Contact_Email){
   console.log("scope.firstName");
   //checking for uniqueness
  var retObj=$scope.contactList.filter(function(obj){
     return (obj.contactNumber==$scope.contactNumber ||obj.contactEmail==$scope.Contact_Email)
   });
   if(retObj.length>0){
     alert("This contact Number/Email is already exist"); 
     return;
   }
 //pushing into array

   $scope.contactList.push({"firstName":$scope.firstName,"lastName":$scope.lastName,"contactNumber":$scope.contactNumber,"contactEmail":$scope.Contact_Email});
   $scope.firstName='';
   $scope.lastName='';
   $scope.Middle_Name="";   
   $scope.contactNumber='';
   $scope.Contact_Email='';


 }else{
   

   alert("Please enter valid details before adding a contact");
 }

}
$scope.editContact=function(index){
   // console.log("edit index"+index+"TRUE/FALSE"+$scope.enabledEdit[index]);
	if($scope.enabledEdit[index] == undefined){
    $scope.enabledEdit[index]=true;
  }else{
    $scope.enabledEdit[index]=!$scope.enabledEdit[index];
  }
}

$scope.contactlength=function(){
  //alert($scope.contactNumber.length);
  alert();
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