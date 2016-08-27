app.controller('appStartCtrl', function($scope, $timeout, $ionicLoading, $state) {
    $scope.user = {};

    if (checkLocalStorage('referral')) {
        $scope.user.empId = parseInt(window.localStorage['referral']);
    }
    if (checkLocalStorage('event')) {
        $scope.user.event = parseInt(window.localStorage['event']);
    }
    localStorage.clear();
    $scope.saveName = function() {
        window.localStorage['referral'] = $scope.user.empId;
        window.localStorage['event'] = $scope.user.event;
        $state.go('register');
    }

});
