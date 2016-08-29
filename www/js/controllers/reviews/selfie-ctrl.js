app.controller('SelfieCtrl', function($scope, $timeout, $ionicLoading, $cordovaCamera, $http, $ionicPopup, $stateParams, $state, $ionicHistory) {
    $scope.imagePath = '';

    $scope.from = $stateParams.from;
    $scope.itemId = $stateParams.itemId;
    $scope.reviewId = $stateParams.reviewId;
    $scope.userId = (JSON.parse(window.localStorage['user'] || '{}')).uid;
    $scope.userName = (JSON.parse(window.localStorage['user'] || '{}')).name;
    $scope.showBtns = true;
    $scope.imageClicked = false;
    $ionicHistory.clearHistory();

    $scope.cameraUpload = function() {
        $scope.showBtns = false;
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
            $scope.url = imageURI;
            $ionicLoading.show();
            resizeImage(imageURI);

        }, function(err) {

            //console.log(err);
        });
    };

    function resizeImage(source) {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        img = new Image();
        img.onload = function() {
            canvas.height = canvas.width * (img.height / img.width);
            /// step 1
            var oc = document.createElement('canvas');
            var octx = oc.getContext('2d');
            oc.width = img.width * 0.5;
            oc.height = img.height * 0.5;
            octx.drawImage(img, 0, 0, oc.width, oc.height);
            /// step 2
            octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
            ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL("image/jpeg");

            $http.post("http://139.162.3.205/api/profileImg", { path: dataURL })
                .success(function(response) {
                    document.getElementById("myImage").src = response.Message;
                    $scope.imagePath = response.Message;

                })
                .error(function(response) {
                    $ionicPopup.alert({
                        title: 'Error Occurred',
                        template: 'Please try again'
                    })
                });
        }
        img.src = source;
        document.getElementById("myImage").src = $scope.imagePath;
        $timeout(function() {
            $scope.imageClicked = true;
            $ionicLoading.hide();
        }, 10000);
    }

    $scope.submit = function() {
        // alert('called');
        if ($scope.imagePath.length != 0) {
            db.ref('users/' + $scope.userId +'/profilePic').set($scope.imagePath);
            db.ref($scope.from + '/-KPmH9oIem1N1_s4qpCv/' + $scope.itemId + '/' + $scope.userId + '/' + $scope.reviewId + '/photoUrl').set($scope.imagePath).then(function() {
                // alert('updated');
                $ionicPopup.alert({
                    title: 'Successfully submitted review',
                    template: 'Thank you for sharing your review.'
                }).then(function() {
                    $state.go('register');
                })
            });
        } else {
            $ionicPopup.alert({
                title: 'Successfully submitted review',
                template: 'Your review was successfully submitted'
            }).then(function() {
                $state.go('register');
            })
        }



}

$scope.writeReview = function(){
        $state.go('projects');
    }


})
