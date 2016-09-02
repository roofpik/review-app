app.controller('syncNfetchCtrl', function($scope, $state, $timeout, $ionicPopup, $ionicLoading){
	$scope.allUsers = {};
	$ionicLoading.show();
	$timeout(function(){
		var hasUsers = checkLocalStorage('allUsers');
		if(hasUsers){
			console.log(1);
			$scope.allUsers = JSON.parse(window.localStorage['allUsers']);
			if(Object.keys($scope.allUsers).length){
				console.log(2);
				$scope.showMsg = false;
			} else {
				console.log(3);
				$scope.showMsg = true;
			}
			$ionicLoading.hide();
		} else {
			console.log(4);
			$scope.showMsg = true;
			$ionicLoading.hide();
		}
	}, 200);

	$scope.mobileNums = {};
	$scope.emails = {};
	$scope.uniqueUsers = {};
	$scope.duplicateUsers = {};

	$scope.sync = function(){
		$ionicLoading.show();
		db.ref('temp').once('value', function(snapshot){
			$timeout(function(){
				if(snapshot.val()){
					$scope.mobileNums = snapshot.val().mobile;
					$scope.emails = snapshot.val().email;
					console.log($scope.mobileNums);
					console.log($scope.emails);
					window.localStorage['mobileNums'] = JSON.stringify($scope.mobileNums);
					window.localStorage['emails'] = JSON.stringify($scope.emails);
				}
				$scope.checkDuplicates();
			}, 0);
			// console.log('called');
		})
	}

	$scope.fetch = function(){
		console.log('fetch called');
		db.ref('temp').once('value', function(snapshot){
			$timeout(function(){
				if(snapshot.val()){
					$scope.mobileNums = snapshot.val().mobile;
					$scope.emails = snapshot.val().email;
					window.localStorage['mobileNums'] = JSON.stringify($scope.mobileNums);
					window.localStorage['emails'] = JSON.stringify($scope.emails);
					console.log('fetch called');
					$ionicLoading.hide();
					$state.go('register');
				}
			}, 100);
		})
	}

	$scope.checkDuplicates = function(){
		var count = 0;
		var currentEmails = {};

		angular.forEach($scope.allUsers, function(value, key){
			var emailDuplicate = value.data.email.replace(".", "--");
			emailDuplicate = emailDuplicate.replace("@","--");
			console.log(currentEmails[emailDuplicate]);
			if($scope.mobileNums[value.mobno] && ($scope.emails[emailDuplicate] || currentEmails[emailDuplicate])){
				value.duplicate = 'mobile and email';
				$scope.duplicateUsers[value.mobno] = value;
			} else if($scope.mobileNums[value.mobno]){
				value.duplicate = 'mobile';
				$scope.duplicateUsers[value.mobno] = value;
			} else if($scope.emails[emailDuplicate] || currentEmails[emailDuplicate]){
				value.duplicate = 'email';
				$scope.duplicateUsers[value.mobno] = value;
			} else {
				$scope.uniqueUsers[value.mobno] = value;
			}
			currentEmails[emailDuplicate] = true;
			count ++;
			if(count == Object.keys($scope.allUsers).length){
				console.log($scope.uniqueUsers);
				console.log($scope.duplicateUsers);
				if(Object.keys($scope.uniqueUsers).length){
					$scope.pushToTemp();
				} else {
					if(Object.keys($scope.duplicateUsers).length) {
						$scope.pushToDuplicates();
					}	
				}
			}
		});
	}

	$scope.pushToTemp = function(){
		console.log('called');
		var uniqueCount = 0;
		angular.forEach($scope.uniqueUsers, function(value, key){
			var uniqueKey = db.ref('temp/users').push().key;
			var updates = {};
			updates['temp/users/'+uniqueKey] = value;
			updates['temp/mobile/'+value.mobno] = true;
			var emailKey = value.data.email.replace(".", "--");
			emailKey = emailKey.replace("@","--");
			updates['temp/email/'+emailKey] = true;
			updates['temp/referrals/'+uniqueKey] = value.data.myReferralCode;
			console.log(updates);
			uniqueCount++;
			db.ref().update(updates).then(function(){
				delete $scope.allUsers[value.mobno];
				window.localStorage['allUsers'] = JSON.stringify($scope.allUsers);
				if(uniqueCount == Object.keys($scope.uniqueUsers).length){
					if(Object.keys($scope.duplicateUsers).length) {
						$scope.pushToDuplicates();
					} else {
						$scope.fetch();
					}
				}
			});
		})
	}

	var popupCount = 0;
	$scope.pushToDuplicates = function(){
		var duplicateCount = 0;
		angular.forEach($scope.duplicateUsers, function(value, key){
			var updates = {};
			var duplicateKey = db.ref('duplicates').push().key;
			updates['duplicates/'+duplicateKey] = value;
			duplicateCount++;
			db.ref().update(updates).then(function(){
				delete $scope.allUsers[value.mobno];
				window.localStorage['allUsers'] = JSON.stringify($scope.allUsers);
				if(duplicateCount == Object.keys($scope.duplicateUsers).length){
					$scope.fetch();
				}
			});
		});
	}

	$scope.goHome = function(){
    	$state.go('register');
    }
}) 