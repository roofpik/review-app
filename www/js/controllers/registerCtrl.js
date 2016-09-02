app.controller('registerCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $ionicModal, $timeout, $state, $ionicHistory) {

    var hasUsers = checkLocalStorage('allUsers');
    console.log(hasUsers);
    var allUsers = {};
    var mobileNums = {};
    var emails = {};
    if(hasUsers){
        allUsers = JSON.parse(window.localStorage['allUsers'] || {});
        console.log(allUsers);
    }

    var hasMobile = checkLocalStorage('mobileNums');
    if(hasMobile){
        mobileNums = JSON.parse(window.localStorage['mobileNums'] || {});
    }

    var hasEmails = checkLocalStorage('emails');
    if(hasEmails){
        emails = JSON.parse(window.localStorage['emails'] || {});
    }

    console.log(emails);
    console.log(mobileNums);

    $scope.user = {
        address: {
            cityId: '-KPmH9oIem1N1_s4qpCv',
            cityName: 'Gurgaon'
        }
    };

    $scope.verifyMobileData = {};
    $scope.disableSubmitBtn = true;

    function getReferralCode() {
        var refchar;
        var refnum;
        var fnameLength = $scope.user.fname.length;
        if (fnameLength > 4) {
            refchar = $scope.user.fname.substring(0, 4);
        } else {
            refchar = $scope.user.fname.substring(0, fnameLength) + $scope.user.lname.substring(0, (4 - fnameLength));
        }
        refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return refchar + refnum
    }

    $scope.signup = function(){
        var myReferral = getReferralCode();
        console.log(myReferral);
        if(!$scope.disableSubmitBtn){
            if(angular.isDefined($scope.user.mobno)){
                console.log($scope.user.mobno);
            } else {
                var mobileNum = '1' + myReferral.substring(4,8) + (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000);
                console.log(mobileNum);
                $scope.user.mobno = parseInt(mobileNum);
            }
            if(angular.isDefined($scope.user.email)){
                console.log($scope.user.email);
            } else {
                var emailAddress = myReferral.toLowerCase()+'@roofpik.com';
                $scope.user.email = emailAddress;
            }
        }

        var emailDuplicate = $scope.user.email.replace(".", "--");
        emailDuplicate = emailDuplicate.replace("@","--");
        console.log(allUsers[$scope.user.mobno]);
        console.log(mobileNums[$scope.user.mobno]);
        console.log(emails[emailDuplicate]);
        console.log(emails);

        if(allUsers[$scope.user.mobno] || mobileNums[$scope.user.mobno] || emails[emailDuplicate]){
            $ionicPopup.alert({
                title: 'User already registered',
                template: 'This user is already registered.'
            }).then(function(){
                $scope.user = {};
                $scope.verifyMobileData = {};
                console.log(allUsers);
            })
        } else {
            console.log(myReferral);
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
                    address : $scope.user.address,
                    myReferralCode : myReferral
                }
            }
            console.log($scope.verifyMobileData);
            allUsers[$scope.user.mobno] = $scope.verifyMobileData;
            var currentMobile = $scope.user.mobno;
            window.localStorage['currentMobile'] = JSON.stringify(currentMobile);
            window.localStorage['allUsers'] = JSON.stringify(allUsers);
            $ionicPopup.alert({
                title: 'Successfully registered',
                template: 'You have successfully registered!'
            }).then(function(){
                $scope.user = {};
                $scope.verifyMobileData = {};
                console.log(allUsers);
                $state.go('summary');
            })
        }
    }

    var enableCount = 1;

    $scope.enableSubmit = function(){
        console.log(enableCount);
        if(enableCount == 3){
            $scope.disableSubmitBtn = false;
        }else {
            enableCount++;
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
