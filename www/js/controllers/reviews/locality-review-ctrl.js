app.controller('localityReviewCtrl', function($scope, $ionicPopup, $stateParams, $state, $ionicLoading) {

    $scope.localityName = $stateParams.localityName;
    $scope.projectId = $stateParams.id;
    // $scope.userId = window.localStorage.getItem("userUid");
    $scope.userId = (JSON.parse(window.localStorage['user'] || '{}')).uid;
    $scope.userName = (JSON.parse(window.localStorage['user'] || '{}')).name;
    

    // $scope.localityName = "Sohna Road";
    

    $scope.hospitalY = false;
    $scope.marketY = false;
    $scope.schoolY = false;

    $scope.review ={};

    $scope.closeBy = [
        { id: 'school', name: 'Good Schools', imgsrc: 'img/review/school_grey.png' },
        { id: 'market', name: 'Market', imgsrc: 'img/review/market_grey.png' },
        { id: 'hospital', name: 'Good Hospitals', imgsrc: 'img/review/hospital_grey.png' }
    ];

    $scope.selectCloseby = function(val, index) {
        type = val + 'Y';
        $scope[type] = !$scope[type];
        if ($scope[type]) {
            $scope.closeBy[index].imgsrc = 'img/review/' + val + '.png';
        } else {
            $scope.closeBy[index].imgsrc = 'img/review/' + val + '_grey.png';
        }
    }

    $scope.comment = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

    $scope.ratingsObject1 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback1(rating);
        }
    };

    $scope.ratingsCallback1 = function(rating) {
        $scope.review.rating = rating;
        $scope.mainComment = $scope.comment[rating - 1];
    };

    $scope.safetyAndSecurity = {};

    $scope.ratingsObject2 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback2(rating);
        }
    };

    $scope.ratingsCallback2 = function(rating) {
        $scope.safetyAndSecurity.rating = rating;
        $scope.safetyAndSecurity.comment = $scope.comment[rating - 1];
    };

    $scope.infrastructure = {};

    $scope.ratingsObject3 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback3(rating);
        }
    };

    $scope.ratingsCallback3 = function(rating) {
        $scope.infrastructure.rating = rating;
        $scope.infrastructure.comment = $scope.comment[rating - 1];
    };

    $scope.parksOpenandGreenAreas = {};

    $scope.ratingsObject4 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback4(rating);
        }
    };

    $scope.ratingsCallback4 = function(rating) {
        $scope.parksOpenandGreenAreas.rating = rating;
        $scope.parksOpenandGreenAreas.comment = $scope.comment[rating - 1];
    };

    $scope.electricityandWaterSupply = {};

    $scope.ratingsObject5 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback5(rating);
        }
    };

    $scope.ratingsCallback5 = function(rating) {
        $scope.electricityandWaterSupply.rating = rating;
        $scope.electricityandWaterSupply.comment = $scope.comment[rating - 1];
    };


    $scope.submitReview = function() {
        $ionicLoading.show();
        $scope.review.time = new Date().getTime();
        // $scope.review.customerId = window.localStorage.getItem("userUid");
        // $scope.review.customerName = window.localStorage.getItem("userName");
        $scope.review.display = false;
        $scope.review.verified = false;
        if ($scope.review.ratings == undefined) {
            $scope.review.ratings = {};
        }
        if ($scope.safetyAndSecurity.rating != 0 && $scope.safetyAndSecurity.rating != undefined) {
            $scope.review.ratings.safetyAndSecurity = $scope.safetyAndSecurity.rating;
        }
        if ($scope.infrastructure.rating != 0 && $scope.infrastructure.rating != undefined) {
            $scope.review.ratings.infrastructure = $scope.infrastructure.rating;
        }
        if ($scope.parksOpenandGreenAreas.rating != 0 && $scope.parksOpenandGreenAreas.rating != undefined) {
            $scope.review.ratings.parksOpenandGreenAreas = $scope.parksOpenandGreenAreas.rating;
        }
        if ($scope.electricityandWaterSupply.rating != 0 && $scope.electricityandWaterSupply.rating != undefined) {
            $scope.review.ratings.electricityandWaterSupply = $scope.electricityandWaterSupply.rating;
        }

        if ($scope.review.closeBy == undefined) {
            $scope.review.closeBy = {};
        }
        angular.forEach($scope.closeBy, function(value, key) {
            if ($scope[value.id + 'Y'] == true) {
                $scope.review.closeBy[value.id] = true;
            }
        });
        if (Object.keys($scope.review.closeBy).length == 0) {
            delete $scope.review.closeBy;
        }
        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }
        if ($scope.review.rating == 0 || $scope.review.rating == undefined) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Insufficient information',
                template: 'Your review was not submitted'
            })
        } else {
            $scope.review.userId = $scope.userId;
            var newKey = db.ref('localityReviews/-KPmH9oIem1N1_s4qpCv/' + $scope.projectId + '/' + $scope.userId).push().key;
            db.ref('localityReviews/-KPmH9oIem1N1_s4qpCv/' + $scope.projectId + '/' + $scope.userId + '/' + newKey).update($scope.review).then(function() {
                $ionicLoading.hide();
                $state.go('selfie', { from: 'localityReviews', reviewId: newKey, itemId: $scope.projectId });
            });
            //console.log('users/' + $scope.userId +'/reviews/locality/' + $scope.projectId + '/' + newKey);
            db.ref('users/' + $scope.userId +'/reviews/-KPmH9oIem1N1_s4qpCv/locality/' + $scope.projectId + '/' + newKey).set(true);

        }
    }

    $scope.suggestions = [
        'Public Transport', 'Traffic', 'Noise and Air Pollution', 'Quality of Roads', 'Electricity Supply', 'Water supply', 'Drainage', 'Street Lights', 'Parks'
    ];


    $scope.showInfo = function() {
        $scope.showSuggestions = true;
        // $scope.modal.show();
    }

    $scope.closeInfo = function() {
        $scope.showSuggestions = false;
    }

    $scope.showValue = function() {
        if ($scope.review.review) {
            var i = $scope.review.review.length;
            var str = $scope.review.review;
            var res = str.charAt(i - 1);
            $scope.num = $scope.review.review.split(" ").length - 1;
        }
    }

    $scope.goBack = function() {
        $state.go('projects');
    }

});
