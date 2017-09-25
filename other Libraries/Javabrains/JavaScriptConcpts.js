var check=true;
var createPromiseforByke = new Promise(function (resolve, reject) {
	if(check){
	var byke={
		name:'Pulser',
		model:'220cc'
	}
		resolve(byke);
		
	}else{
		
		var err=new Error('Sorry..!Bike is not available currntly');
		reject(err);
	}
});



createPromiseforByke.then(function(resp){
	alert('Hurrah..! you got '+resp.name);
}).catch(function(err){
	alert(err.message);
});

