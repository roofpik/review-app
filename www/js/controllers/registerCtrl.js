app.controller('registerCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $ionicModal, $timeout, $state, $ionicHistory) {

    $scope.user = {};

    $scope.otp = {};
    $scope.user.address = null;
    $scope.user.tower = null;
    $scope.user.flat = null;
    $scope.user.fname = null;
    $scope.user.lname = null;
    $scope.user.mobno = null;
    // $scope.user.address = 'escape';
    $scope.user.email = null;
    // $scope.user.tower = 5;
    // $scope.user.flat = 8;
    var localUser = {};
    // db.ref('verifyMobile').remove();
    // db.ref('marketing').remove();
    // db.ref('users').remove();
    //
    firebase.auth().signOut();
    delete window.localStorage["user"];

    $('input[type="textbox"]').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).next().focus();
        }
    });

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.signup = function() {
        $ionicLoading.show();
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
        setData();
        db.ref('verifyMobile/' + $scope.user.mobno).once('value', function(snapshot) {

            if (snapshot.val() != null) {
                if (snapshot.val().verifyFlag == true && snapshot.val().reviews) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Mobile Number Exists',
                        template: 'Mobile number you have entered is already registered with us and a review is already written.'
                    });
                } else if (snapshot.val().verifyFlag == true) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Mobile Number Exists',
                        template: 'Mobile number you have entered is already registered and is already verified!'
                    }).then(function() {
                        $state.go('verifyMobile', { verifyId: '1', mobno: $scope.user.mobno });
                    });
                } else if (snapshot.val().verifyFlag == false) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Mobile Number Exists',
                        template: 'Mobile number you have entered is already registered with us but not verified, please verify your mobile number'
                    }).then(function() {
                        $scope.resendOtp();
                        $scope.otp.code = {};
                        $scope.modal.show();
                    })

                }

            } else {

                $http({
                    url: 'http://139.162.3.205/api/newRegistration',
                    method: "POST",
                    params: {
                        mobno: $scope.user.mobno
                    }
                }).success(function(response) {
                    console.log(response);
                    var updates = {};
                    $scope.userData.referralCode = window.localStorage['referral'];
                    updates['/verifyMobile/' + $scope.user.mobno + '/data'] = $scope.userData;
                    db.ref().update(updates);
                    $scope.modal.show();
                    $ionicLoading.hide();
                });
            }

        });


    }


    function setData() {
        if (checkLocalStorage('project')) {
            $scope.user.projectName = JSON.parse(window.localStorage['project'] || {}).projectName;
            $scope.user.projectId = JSON.parse(window.localStorage['project'] || {}).projectId;
        } else {
            $scope.user.projectName = null;
            $scope.user.projectId = null
        }

        if (checkLocalStorage('locality')) {
            $scope.user.localityName = JSON.parse(window.localStorage['locality'] || {}).localityName;
            $scope.user.localityId = JSON.parse(window.localStorage['locality'] || {}).localityId;
        } else {
            $scope.user.localityName = null;
            $scope.user.localityId = null
        }

        $scope.userData = {
            fname: $scope.user.fname,
            lname: $scope.user.lname,
            email: $scope.user.email,
            gender: $scope.user.gender,
            address: {
                projectName: $scope.user.projectName,
                projectId: $scope.user.projectId,
                localityName: $scope.user.localityName,
                localityId: $scope.user.localityId,
                location: $scope.user.address,
                tower: $scope.user.tower,
                flat: $scope.user.flat,
                cityId: '-KPmH9oIem1N1_s4qpCv',
                cityName: 'Gurgaon'
            }

        }
    }





    $scope.resendOtp = function() {
        $ionicLoading.show();
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
        $http({
            url: 'http://139.162.3.205/api/resentOtp',
            method: "POST",
            params: {
                mobno: $scope.user.mobno
            }
        }).success(function(response) {
            $ionicLoading.hide();
            //console.log(response);
        });
    }

    $scope.verifyOtp = function() {
        $ionicLoading.show();
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);

        if ($scope.otp.code == '875643') {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Mobile Number Verified',
                template: 'You have manually verified the mobile number'
            });
            localUser.manualVerify = true;

            registerUser();



        } else {
            localUser.manualVerify = false;
            $http({
                url: 'http://139.162.3.205/api/verifyOtp',
                method: "POST",
                params: {
                    mobno: $scope.user.mobno,
                    otp: $scope.otp.code
                }
            }).success(function(response) {
                $ionicLoading.hide();
                if (response.statusCode == '200') {
                    $ionicPopup.alert({
                        title: 'Mobile Number Verified',
                        template: response.message
                    });
                    registerUser();
                } else if (response.statusCode == '400') {
                    $ionicPopup.alert({
                        title: 'Invalid Code',
                        template: response.message
                    })
                } else {
                    $ionicPopup.alert({
                        title: 'Something went wrong',
                        template: 'Please try again'
                    })
                }
            });

        }

    }



    function randomString(length, chars) {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }

    function genReferralCode() {
        var refchar;
        var refnum;
        var fnameLength = $scope.userData.fname.length;
        if (fnameLength > 4) {
            refchar = $scope.userData.fname.substring(0, 4);
        } else {
            refchar = $scope.userData.fname.substring(0, fnameLength) + $scope.userData.lname.substring(0, (4 - fnameLength));
        }

        refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return refchar + refnum

    }

    function registerUser() {
        var password = randomString(16, '#aA');



        firebase.auth().createUserWithEmailAndPassword($scope.user.email, password).then(function(response) {
            var d = new Date();
            var time = d.getTime();
            $ionicLoading.show();
            $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
            var myReferralCode = genReferralCode();
            $scope.userData.tempPassword = password;
            $scope.userData.uid = response.uid;
            $scope.userData.createdTime = time;
            $scope.userData.activeFlag = true;
            $scope.userData.emailFlag = false;
            $scope.userData.mobileFlag = true;
            $scope.userData.deviceId = '1234';
            $scope.userData.regType = 'event';
            $scope.userData.tempFlag = true;
            $scope.userData.myReferralCode = myReferralCode;
            $scope.userData.eventId = window.localStorage['event'];
            $scope.userData.referralCode = window.localStorage['referral'];
            $scope.userData.mobno = $scope.user.mobno;
            var updates = {};

            localUser.name = $scope.userData.fname + " " + $scope.userData.lname;
            localUser.uid = response.uid;
            localUser.time = time;
            updates['/verifyMobile/' + $scope.user.mobno + '/verifyFlag'] = true;
            updates['/verifyMobile/' + $scope.userData.mobno + '/uid/'] = response.uid;
            updates['/users/' + response.uid] = $scope.userData;
            updates['/referrals/data/' + $scope.userData.myReferralCode + '/uid/'] = response.uid;
            updates['/marketing/events/user/' + window.localStorage['referral'] + '/' + response.uid] = localUser;
            db.ref().update(updates).then(function() {
                window.localStorage['user'] = JSON.stringify(localUser);
                $timeout(function() {
                    $scope.modal.hide();
                    $ionicLoading.hide();
                    $scope.user = {};
                    $scope.otp = {};
                    $scope.user.address = null;
                    $scope.user.tower = null;
                    $scope.user.flat = null;
                    $state.go('verifyMobile', { verifyId: '2', mobno: $scope.userData.mobno });
                }, 500)

            });


        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $ionicPopup.alert({
                    title: errorCode,
                    template: errorMessage
                })
                // ...
        });

    }

});
