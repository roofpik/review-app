app.controller('summaryCtrl', function($scope, $ionicPopup, $state){
	console.log('working');
	var currentMobile = JSON.parse(window.localStorage['currentMobile'] || {});
	var allUsers = JSON.parse(window.localStorage['allUsers'] || {});

	$scope.thisUser = allUsers[currentMobile];
	console.log($scope.thisUser);

	$scope.data = {};

	var popupCount = 1;
	$scope.showPopup = function(){
		if(popupCount == 3){
			  $ionicPopup.show({
			    template: '<label><input type="text" ng-model="data.couponCode" placeholder="Coupon Code" style="padding:0px 10px;"></label></br><label><input type="number" ng-model="data.couponAmout" placeholder="Coupon Amount" style="padding:0px 10px;"></label>',
			    title: 'Enter coupon details',
			    scope: $scope,
			    buttons: [
			      { text: 'Skip',
			      	type: 'button-assertive'
			       },
			      {
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          if($scope.data.couponCode && $scope.data.couponAmout){
			          	allUsers[currentMobile].couponDetails = $scope.data;
			          	console.log(allUsers[currentMobile]);
			          	window.localStorage['allUsers'] = JSON.stringify(allUsers);
			          } else {
			          	e.preventDefault();
			          }
			        }
			      }
			    ]
			  }).then(function(res) {
			    popupCount = 1;
			  });
		} else {
			popupCount++;
		}
	}
    var count = 1;

    $scope.goToSyncAndFetch = function(){
        console.log(count);
        if(count == 7){
            $state.go('syncNfetch');
        } else {
            count++;
        }
    }

    $scope.goHome = function(){
    	$state.go('register');
    }
});