app.controller('underConstructionReviewCtrl', function($scope, $ionicPopup, $stateParams, $state, $ionicLoading){

	$scope.projectName = $stateParams.projectName;
	$scope.projectId = $stateParams.id;
	// $scope.userId = window.localStorage.getItem("userUid");
	$scope.userId = '1234';
	// $scope.projectName = "Vipul Greens";
	$scope.review = {};

	$scope.identities = [
		{id: 'owner', name: 'Owner', imgsrc:'img/review/owner_grey.png'},
		{id: 'other', name: 'Other', imgsrc:'img/review/other_grey.png'},
	];

	$scope.ownerY = false;
	$scope.otherY = false;

	$scope.comment = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

	$scope.selectIdentity = function(val, index){
		angular.forEach($scope.identities, function(value, key){
			if(val == value.id){
				$scope[val+'Y'] = true;
				$scope.identities[key].imgsrc = 'img/review/'+value.id+'.png';
			} else {
				$scope[value.id+'Y'] = false;
				$scope.identities[key].imgsrc = 'img/review/'+value.id+'_grey.png';
			}
		});
		console.log($scope.ownerY, $scope.otherY);
	}

	$scope.ratingsObject1= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback1(rating);
		}
	};

	$scope.ratingsCallback1 = function(rating) {
		$scope.review.rating = rating;
		$scope.mainComment = $scope.comment[rating-1];
		console.log($scope.mainComment);
	};

	$scope.clubhouseAmenities = {};

	$scope.ratingsObject2= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback2(rating);
		}
	};

	$scope.ratingsCallback2 = function(rating) {
		$scope.clubhouseAmenities.rating = rating;
		$scope.clubhouseAmenities.comment = $scope.comment[rating-1];
	};

	$scope.openGreenAreas = {};

	$scope.ratingsObject3= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback3(rating);
		}
	};

	$scope.ratingsCallback3 = function(rating) {
		$scope.openGreenAreas.rating = rating;
		$scope.openGreenAreas.comment = $scope.comment[rating-1];
	};

	$scope.valueForMoney = {};

	$scope.ratingsObject4= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback4(rating);
		}
	};

	$scope.ratingsCallback4 = function(rating) {
		$scope.valueForMoney.rating = rating;
		$scope.valueForMoney.comment = $scope.comment[rating-1];
	};

	$scope.rentOnInvestment = {};

	$scope.ratingsObject5= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback5(rating);
		}
	};

	$scope.ratingsCallback5 = function(rating) {
		$scope.rentOnInvestment.rating = rating;
		$scope.rentOnInvestment.comment = $scope.comment[rating-1];
	};

	$scope.location = {};

	$scope.ratingsObject6= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback6(rating);
		}
	};

	$scope.ratingsCallback6 = function(rating) {
		$scope.location.rating = rating;
		$scope.location.comment = $scope.comment[rating-1];
	};

	$scope.currentConnectivity = {};

	$scope.ratingsObject7= {
		iconOn: 'ion-record',
		iconOff: 'ion-ios-circle-outline',
		iconOnColor: '#F26551',
		iconOffColor: '#18AFD1',
		rating: 0,
		minRating: 0,
		readOnly:false,
		callback: function(rating) { 
		 	$scope.ratingsCallback7(rating);
		}
	};

	$scope.ratingsCallback7 = function(rating) {
		$scope.currentConnectivity.rating = rating;
		$scope.currentConnectivity.comment = $scope.comment[rating-1];
	};


	$scope.submitReview = function(){
		$ionicLoading.show();
		if($scope.ownerY == true){
			$scope.review.customerType = 'owner';
		} else if($scope.otherY == true){
			$scope.review.customerType = 'other';
		}

	    $scope.review.time = new Date().getTime();
	    // $scope.review.customerId = window.localStorage.getItem("userUid");
	    // $scope.review.customerName = window.localStorage.getItem("userName");
	    $scope.review.display = false;
	    $scope.review.verified = false;
	    if($scope.review.ratings == undefined){
	    	$scope.review.ratings = {};
	    }
	    if($scope.clubhouseAmenities.rating != 0 && $scope.clubhouseAmenities.rating != undefined){
	      $scope.review.ratings.clubhouseAmenities = $scope.clubhouseAmenities.rating;
	    }
	    if($scope.openGreenAreas.rating != 0 && $scope.openGreenAreas.rating != undefined){
	      $scope.review.ratings.openGreenAreas = $scope.openGreenAreas.rating;
	    }
	    if($scope.valueForMoney.rating != 0 && $scope.valueForMoney.rating != undefined){
	      $scope.review.ratings.valueForMoney = $scope.valueForMoney.rating;
	    }
	    if($scope.rentOnInvestment.rating != 0 && $scope.rentOnInvestment.rating != undefined){
	      $scope.review.ratings.rentOnInvestment = $scope.rentOnInvestment.rating;
	    }
		if($scope.location.rating != 0 && $scope.location.rating != undefined){
	    	$scope.review.ratings.location = $scope.location.rating;
	    }
		if($scope.currentConnectivity.rating != 0 && $scope.currentConnectivity.rating != undefined){
	    	$scope.review.ratings.currentConnectivity = $scope.currentConnectivity.rating;
	    }

	    console.log($scope.review.ratings);
	    console.log(Object.keys($scope.review.ratings).length);
	    if(Object.keys($scope.review.ratings).length == 0){
	      delete $scope.review.ratings;
	    }
	    console.log($scope.review);
	    console.log($scope.review.rating);
	    if(($scope.review.customerType == undefined) || ($scope.review.rating==0 || $scope.review.rating == undefined)){
	    	$ionicLoading.hide();
	    	$ionicPopup.alert({
	    		title: 'Insufficient information',
	    		template:'Your review was not submitted'
	    	})
	    } else {
	    	var newKey = db.ref('projectReviews/-KPmH9oIem1N1_s4qpCv/'+$scope.projectId+'/'+$scope.userId).push().key;
	    	db.ref('projectReviews/-KPmH9oIem1N1_s4qpCv/'+$scope.projectId+'/'+$scope.userId+'/'+newKey).update($scope.review).then(function(){
	    		$ionicLoading.hide();
	    		$ionicPopup.alert({
	    			title: 'Successfully submitted review',
	    			template: 'Your review was successfully submitted'
	    		}).then(function(){
	    			$state.go('app.projects');
	    		})
	    	});
	    }
	}

	$scope.suggestions = [
		'Layout of the Apartment', 'Clubhouse', 'Current Access from the Main Road', 'Current Connectivity', 'Infrastructure', 'Value for Money', 'Construction Schedule'
	];

	$scope.showInfo = function(){
		$scope.showSuggestions = true;
		// $scope.modal.show();
	}

	$scope.closeInfo = function(){
		$scope.showSuggestions = false;
	}

	$scope.showValue = function(){
		if($scope.review.review){
			var i = $scope.review.review.length;
			var str = $scope.review.review;
			var res = str.charAt(i-1);
			console.log(res);
			$scope.num = $scope.review.review.split(" ").length - 1;
			console.log($scope.num);
		}
	}

	$scope.goBack = function(){
		$state.go('app.projects');
	}

});