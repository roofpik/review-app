app.controller('registerCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $ionicModal, $timeout, $state, $ionicHistory) {

    var hasUsers = checkLocalStorage('allUsers');
    console.log(hasUsers);
    var allUsers = {};
    if(hasUsers){
        allUsers = JSON.parse(window.localStorage['allUsers'] || {});
        console.log(allUsers);
    }

    $scope.user = {
        address: {
            cityId: '-KPmH9oIem1N1_s4qpCv',
            cityName: 'Gurgaon'
        }
    };

    $scope.verifyMobileData = {};

    $scope.signup = function(){
        if(allUsers[$scope.user.mobno]){
            $ionicPopup.alert({
                title: 'Mobile Number Exists',
                template: 'Mobile number you have entered is already registered!'
            }).then(function(){
                $scope.user = {};
                $scope.verifyMobileData = {};
                console.log(allUsers);
            })
        } else {
            $scope.verifyMobileData = {
                createdTime: new Date().getTime(),
                mobno: $scope.user.mobno,
                verifyFlag: false,
                data: {
                    email: $scope.user.email,
                    fname: $scope.user.fname,
                    lname: $scope.user.lname,
                    gender: $scope.user.gender,
                    referralCode: JSON.parse(window.localStorage['referral']),
                    address : $scope.user.address
                }
            }
            console.log($scope.verifyMobileData);
            allUsers[$scope.user.mobno] = $scope.verifyMobileData;
            window.localStorage['allUsers'] = JSON.stringify(allUsers);
            $ionicPopup.alert({
                title: 'Successfully registered',
                template: 'You have successfully registered!'
            }).then(function(){
                $scope.user = {};
                $scope.verifyMobileData = {};
                console.log(allUsers);
            })
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
});
