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

    var count = 1;

    $scope.goToSyncAndFetch = function(){
        console.log(count);
        if(count == 7){
            $state.go('syncNfetch');
        } else {
            count++;
        }
    }

});
