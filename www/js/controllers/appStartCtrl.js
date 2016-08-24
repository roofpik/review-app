app.controller('appStartCtrl', function($scope, $timeout, $ionicLoading, $state) {
$scope.user= {};
   $scope.saveName = function(){ 
   window.localStorage['referralCode'] = $scope.user.name;
   $state.go('app.projects');
}

});
