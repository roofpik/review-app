app.controller('appStartCtrl', function($scope, $timeout, $ionicLoading, $state, $ionicHistory) {
    $scope.user = {};
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();

    if (checkLocalStorage('referral')) {
        $scope.user.empId = parseInt(window.localStorage['referral']);
    }
    if (checkLocalStorage('event')) {
        $scope.user.event = parseInt(window.localStorage['event']);
    }

    
   
    $scope.saveName = function() {
        window.localStorage['referral'] = $scope.user.empId;
        window.localStorage['event'] = $scope.user.event;
        $state.go('register');
    }

    $scope.checkMobile = function(){
        $state.go('checkMobile');
    }

});
