app.controller('residentialReviewCtrl', function($scope, $ionicPopup, $stateParams, $state, $ionicLoading) {
    //console.log($stateParams.id);
    $scope.projectName = $stateParams.projectName;
    $scope.projectId = $stateParams.id;
    //console.log($scope.projectId);
    // $scope.projectName = "Vipul Greens";

    // $scope.userId = window.localStorage.getItem("userUid");
    $scope.userId = (JSON.parse(window.localStorage['user'] || '{}')).uid;
    $scope.userName = (JSON.parse(window.localStorage['user'] || '{}')).name;

    $scope.review = {};

    $scope.identities = [
        { id: 'resident', name: 'Resident', imgsrc: 'img/review/resident_grey.png' },
        { id: 'nonResident', name: 'Non Resident', imgsrc: 'img/review/nonResident_grey.png' },
    ];

    $scope.residentY = false;
    $scope.nonResidentY = false;

    $scope.comment = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

    $scope.selectIdentity = function(val, index) {
        angular.forEach($scope.identities, function(value, key) {
            if (val == value.id) {
                $scope[val + 'Y'] = true;
                $scope.identities[key].imgsrc = 'img/review/' + value.id + '.png';
            } else {
                $scope[value.id + 'Y'] = false;
                $scope.identities[key].imgsrc = 'img/review/' + value.id + '_grey.png';
            }
        });
        //console.log($scope.residentY, $scope.nonResidentY);
    }

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
        //console.log($scope.mainComment);
    };

    $scope.recommend = [
        { id: 'kids', name: 'Kids', imgsrc: 'img/review/kids_grey.png' },
        { id: 'pets', name: 'Pets', imgsrc: 'img/review/pets_grey.png' },
        { id: 'elders', name: 'Elders', imgsrc: 'img/review/elders_grey.png' },
        { id: 'singles', name: 'Singles', imgsrc: 'img/review/singles_grey.png' },
        { id: 'family', name: 'Family', imgsrc: 'img/review/family_grey.png' }
    ];
    $scope.selectRecommendedFor = function(val, index) {
        //console.log(val, index);
        type = val + 'Y';
        //console.log($scope[type]);
        $scope[type] = !$scope[type];
        //console.log($scope[type]);
        if ($scope[type]) {
            $scope.recommend[index].imgsrc = 'img/review/' + val + '.png';
        } else {
            $scope.recommend[index].imgsrc = 'img/review/' + val + '_grey.png';
        }
    }

    $scope.security = {};

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
        $scope.security.rating = rating;
        $scope.security.comment = $scope.comment[rating - 1];
    };

    $scope.amenities = {};

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
        $scope.amenities.rating = rating;
        $scope.amenities.comment = $scope.comment[rating - 1];
    };

    $scope.openGreenAreas = {};

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
        $scope.openGreenAreas.rating = rating;
        $scope.openGreenAreas.comment = $scope.comment[rating - 1];
    };

    $scope.electricityAndWaterSupply = {};

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
        $scope.electricityAndWaterSupply.rating = rating;
        $scope.electricityAndWaterSupply.comment = $scope.comment[rating - 1];
    };

    $scope.convenienceOfHousemaids = {};

    $scope.ratingsObject6 = {
        iconOn: 'ion-record',
        iconOff: 'ion-ios-circle-outline',
        iconOnColor: '#F26551',
        iconOffColor: '#18AFD1',
        rating: 0,
        minRating: 0,
        readOnly: false,
        callback: function(rating) {
            $scope.ratingsCallback6(rating);
        }
    };

    $scope.ratingsCallback6 = function(rating) {
        $scope.convenienceOfHousemaids.rating = rating;
        $scope.convenienceOfHousemaids.comment = $scope.comment[rating - 1];
    };

    $scope.getConvenient = function(value) {
        $scope.review.convenientlyLocated = value;
        //console.log($scope.review.convenientlyLocated);
    }

    $scope.publicTransport = function(value) {
        $scope.review.easyAccessToPublicTransport = value;
        //console.log($scope.review.easyAccessToPublicTransport);
    }

    $scope.submitReview = function() {
        $ionicLoading.show();
        //console.log($scope.residentY, $scope.nonResidentY);
        if ($scope.residentY == true) {
            $scope.review.customerType = 'resident';
        } else if ($scope.nonResidentY == true) {
            $scope.review.customerType = 'nonResident';
        }
        //console.log($scope.review.customerType);
        if ($scope.review.recommendedFor == undefined) {
            $scope.review.recommendedFor = {};
        }

        angular.forEach($scope.recommend, function(value, key) {
            if ($scope[value.id + 'Y'] == true) {
                $scope.review.recommendedFor[value.id] = true;
            }
        });

        $scope.review.time = new Date().getTime();
        // $scope.review.customerId = window.localStorage.getItem("userUid");
        // $scope.review.customerName = window.localStorage.getItem("userName");
        $scope.review.display = false;
        $scope.review.verified = false;
        if ($scope.review.ratings == undefined) {
            $scope.review.ratings = {};
        }
        if ($scope.security.rating != 0 && $scope.security.rating != undefined) {
            $scope.review.ratings.security = $scope.security.rating;
        }
        if ($scope.amenities.rating != 0 && $scope.amenities.rating != undefined) {
            $scope.review.ratings.amenities = $scope.amenities.rating;
        }
        if ($scope.openGreenAreas.rating != 0 && $scope.openGreenAreas.rating != undefined) {
            $scope.review.ratings.openGreenAreas = $scope.openGreenAreas.rating;
        }
        if ($scope.electricityAndWaterSupply.rating != 0 && $scope.electricityAndWaterSupply.rating != undefined) {
            $scope.review.ratings.electricityAndWaterSupply = $scope.electricityAndWaterSupply.rating;
        }
        if ($scope.convenienceOfHousemaids.rating != 0 && $scope.convenienceOfHousemaids.rating != undefined) {
            $scope.review.ratings.convenienceOfHousemaids = $scope.convenienceOfHousemaids.rating;
        }

        if (Object.keys($scope.review.recommendedFor).length == 0) {
            delete $scope.review.recommendedFor;
        }
        //console.log($scope.review.ratings);
        //console.log(Object.keys($scope.review.ratings).length);
        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }
        //console.log($scope.review.rating);
        if (($scope.review.customerType == undefined) || ($scope.review.rating == 0 || $scope.review.rating == undefined)) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Insufficient information',
                template: 'Your review was not submitted'
            })
        } else {
            $scope.review.userId = $scope.userId;
            var newKey = db.ref('projectReviews/-KPmH9oIem1N1_s4qpCv/' + $scope.projectId + '/' + $scope.userId).push().key;
            db.ref('users/' + $scope.userId +'/reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.projectId + '/' + newKey).set(true);
            db.ref('projectReviews/-KPmH9oIem1N1_s4qpCv/' + $scope.projectId + '/' + $scope.userId + '/' + newKey).update($scope.review).then(function() {
                $ionicLoading.hide();
                $state.go('selfie', { from: 'projectReviews', reviewId: newKey, itemId: $scope.projectId });
            });
        }
    }

    $scope.suggestions = [
        'Layout of the Apartment', 'Quality of Lifts', 'Security', 'Clubhouse', 'Access from the Main Road', 'Maintenance', 'Parking', 'Kids Play Area', 'Senior Citizen Friendly', 'Facilities', 'Traffic and Noise Pollution', 'Services Within the Community'
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
            //console.log(res);
            $scope.num = $scope.review.review.split(" ").length - 1;
            //console.log($scope.num);
        }
    }

    $scope.goBack = function() {
        $state.go('register');
    }

});
