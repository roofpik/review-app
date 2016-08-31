app.controller('syncNfetchCtrl', function($scope){
	$scope.allUsers = {};
	var hasUsers = checkLocalStorage('allUsers');
	if(hasUsers){
		$scope.allUsers = JSON.parse(window.localStorage['allUsers']);
	}

	var serverUsers = {};

	$scope.fetch = function() {
		db.ref('verifyMobile').once('value', function(snapshot){
			console.log(snapshot.val());
			serverUsers = snapshot.val();
		})
	}

	$scope.getLocalUsers = function(){
		$scope.showUsersCalled = true;
		console.log($scope.allUsers);
	}
})