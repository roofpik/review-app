app.controller('verifyMobileCtrl', function($scope, $stateParams, $state, $ionicHistory) {
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();

    $scope.display = {};
    if ($stateParams.verifyId == 1) {
        $scope.display.existmessage = 'Mobile number you have entered is already registered and is already verified!';
    } else if ($stateParams.verifyId == 2) {
        $scope.display.newmessage = 'Thank you for verifying your mobile. You have successfuly registered your mobile.';
    } else if ($stateParams.verifyId == 3) {
        $scope.display.nvmessage = 'Mobile number you have entered is already registered but not verified';
    } else if ($stateParams.verifyId == 4) {
        $scope.display.nvmessage = 'Mobile number you have entered is not registered';
    }
    $scope.display.mobno = $stateParams.mobno;
    var count = 0;
    $scope.gotoStart = function() {

        if (count == 3) {
            count = 0;
            $state.go('start');

        } else {
            $scope.count = count;
            count = count + 1;
        }

    }

});
